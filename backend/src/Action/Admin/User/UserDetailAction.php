<?php

declare(strict_types = 1);

namespace App\Action\Admin\User;

use App\Domain\User\Service\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

final class UserDetailAction
{
    private UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {
        $id = (int)$args['id'];

        // Invoke the Domain with inputs and retain the result
        $user = $this->userService->getUserById($id);

        if (is_null($user)) {
            throw new HttpNotFoundException($request);
        }

        // Transform the result into the JSON representation
        $result = $this->transformResult($user);

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    private function transformResult(array $user): array
    {
        return [
            'id' => $user['id'],
            'username' => $user['username'],
            'firstName' => $user['first_name'],
            'lastName' => $user['last_name'],
            'email' => $user['email'],
        ];
    }
}
