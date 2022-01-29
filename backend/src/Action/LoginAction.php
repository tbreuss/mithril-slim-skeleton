<?php

declare(strict_types = 1);

namespace App\Action;

use App\Domain\Auth\Service\AuthService;
use Firebase\JWT\JWT;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class LoginAction
{
    private AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Collect input from the HTTP request
        $data = (array)$request->getParsedBody();

        $this->authService->login($data);

        // generate JWT token
        $key = $_ENV['API_JWT_PRIVATE_KEY'];

        $payload = [
            'iss' => $_ENV['API_URL'],
            'aud' => $_ENV['API_URL'],
            'iat' => time(),
            'nbf' => time(),
        ];

        $jwt = JWT::encode($payload, $key, 'HS256');

        $result = [
            'token' => $jwt,
        ];

        $response->getBody()->write((string)json_encode($result));

        return $response->withHeader('Content-Type', 'application/json');
    }
}
