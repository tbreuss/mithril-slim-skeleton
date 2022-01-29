<?php

declare(strict_types = 1);

namespace App\Middleware;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Exception\HttpForbiddenException;
use Slim\Exception\HttpUnauthorizedException;

final class AuthMiddleware implements MiddlewareInterface
{
    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        if (!$request->hasHeader('Authorization')) {
            throw new HttpUnauthorizedException($request);
        }

        $bearerTokens = $this->extractTokens($request);
        if (count($bearerTokens) === 0) {
            throw new HttpForbiddenException($request);
        }

        $decodedTokens = $this->decodeTokens($bearerTokens);
        if (count($decodedTokens) === 0) {
            throw new HttpForbiddenException($request);
        }

        foreach ($decodedTokens as $decodedToken) {
            if ($this->hasPermission($decodedToken)) {
                return $handler->handle($request);
            }
        }

        throw new HttpUnauthorizedException($request);
    }

    private function extractTokens(ServerRequestInterface $request): array
    {
        $tokens = [];
        foreach ($request->getHeader('Authorization') as $header) {
            if (substr($header, 0, 6) !== 'Bearer') {
                continue;
            }
            $token = trim(substr($header, 7));
            if (strlen($token) === 0) {
                continue;
            }
            $tokens[] = $token;
        }

        return $tokens;
    }

    private function decodeTokens(array $tokens): array
    {
        $decoded = [];
        foreach ($tokens as $token) {
            try {
                $decoded[] = JWT::decode($token, new Key($_ENV['API_JWT_PRIVATE_KEY'], 'HS256'));
            } catch (\Throwable $t) {
                // TODO log error
            }
        }

        return $decoded;
    }

    private function hasPermission(object $jwt): bool
    {
        // check issuer
        if (!isset($jwt->iss) || ($jwt->iss !== $_ENV['API_URL'])) {
            return false;
        }
        // check audience
        if (!isset($jwt->aud) || ($jwt->aud !== $_ENV['API_URL'])) {
            return false;
        }

        return true;
    }
}
