<?php

declare(strict_types = 1);

namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class PingAction
{
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        $body = (string)json_encode(['time' => time()]);
        $response->getBody()->write($body);

        return $response->withHeader('Content-Type', 'application/json');
    }
}
