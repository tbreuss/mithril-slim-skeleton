<?php

declare(strict_types = 1);

namespace App\Action;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpBadRequestException;
use Slim\Exception\HttpForbiddenException;
use Slim\Exception\HttpGoneException;
use Slim\Exception\HttpInternalServerErrorException;
use Slim\Exception\HttpMethodNotAllowedException;
use Slim\Exception\HttpNotFoundException;
use Slim\Exception\HttpNotImplementedException;
use Slim\Exception\HttpUnauthorizedException;

final class ErrorAction
{
    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {
        $type = (int)$args['type'];

        switch ($type) {
            case 400:
                throw new HttpBadRequestException($request);
            case 401:
                throw new HttpUnauthorizedException($request);
            case 403:
                throw new HttpForbiddenException($request);
            default:
            case 404:
                throw new HttpNotFoundException($request);
            case 405:
                throw new HttpMethodNotAllowedException($request);
            case 410:
                throw new HttpGoneException($request);
            case 500:
                throw new HttpInternalServerErrorException($request);
            case 501:
                throw new HttpNotImplementedException($request);
            case 600:
                trigger_error('Run-time notices', E_USER_NOTICE);
                break;
            case 601:
                trigger_error('Run-time warnings (non-fatal errors)', E_USER_WARNING);
                break;
            case 602:
                trigger_error('Fatal run-time error', E_USER_ERROR);
        }

        return $response->withHeader('Content-Type', 'application/json');
    }
}
