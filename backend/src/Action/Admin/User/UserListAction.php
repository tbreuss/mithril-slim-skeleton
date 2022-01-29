<?php

declare(strict_types = 1);

namespace App\Action\Admin\User;

use App\Data\PaginationInput;
use App\Data\PaginationOutput;
use App\Domain\User\Service\UserListOutput;
use App\Domain\User\Service\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class UserListAction
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Get request params
        $params = $request->getQueryParams();
        $page = !empty($params['page']) ? $params['page'] : 1;

        // Invoke the request DTO
        $paginationInput = new PaginationInput($page);

        // Invoke the Domain with inputs and retain the result
        [$pagination, $users] = $this->userService->listUser($paginationInput);

        // Transform the result into the JSON representation
        $result = $this->transformResult($pagination, $users);

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    /**
     * @param UserListOutput[] $users
     * @param PaginationOutput $pagination
     */
    private function transformResult(PaginationOutput $pagination, array $users): array
    {
        return [
            'paging' => [
                'itemCountPerPage' => $pagination->itemCountPerPage,
                'totalItemCount' => $pagination->totalItemCount,
                'pageCount' => $pagination->pageCount,
                'currentPage' => $pagination->currentPage,
            ],
            'data' => array_map(function (UserListOutput $user): array {
                return [
                    'id' => $user->id,
                    'username' => $user->username,
                    'firstName' => $user->firstName,
                    'lastName' => $user->lastName,
                    'email' => $user->email,
                ];
            }, $users),
        ];
    }
}
