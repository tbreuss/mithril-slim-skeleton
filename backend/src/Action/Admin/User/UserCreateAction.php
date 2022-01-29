<?php

declare(strict_types = 1);

namespace App\Action\Admin\User;

use App\Domain\User\Service\UserService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class UserCreateAction
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
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        // Invoke the Domain with inputs and retain the result
        $userId = $this->userService->createUser($data);

        // Transform the result into the JSON representation
        $result = [
            'user_id' => $userId,
        ];

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(201);
    }
}
