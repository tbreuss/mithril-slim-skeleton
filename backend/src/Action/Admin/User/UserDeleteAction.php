<?php

declare(strict_types = 1);

namespace App\Action\Admin\User;

use App\Domain\User\Service\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpForbiddenException;

final class UserDeleteAction
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

        // NOTE demo user must not be deleted
        if ($id === 20) {
            // TODO send suitable status code and message for proper handling in frontend
            throw new HttpForbiddenException($request);
        }

        $this->userService->deleteUser($id);

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(204);
    }
}
