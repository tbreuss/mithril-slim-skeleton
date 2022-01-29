<?php

declare(strict_types = 1);

use App\Middleware\CorsMiddleware;
use App\Middleware\ValidationExceptionMiddleware;
use Psr\Log\LoggerInterface;
use Slim\App;

return function (App $app) {
    $settings = $app->getContainer()->get('settings');
    $logger = $app->getContainer()->get(LoggerInterface::class);

    // Parse json, form data and xml
    $app->addBodyParsingMiddleware();

    // Add validation exception middleware
    $app->add(ValidationExceptionMiddleware::class);

    // Add Slims built-in routing middleware
    $app->addRoutingMiddleware();

    // Add Slims built-in error middleware
    $app->addErrorMiddleware(
        $settings['error']['display_error_details'],
        $settings['error']['log_errors'],
        $settings['error']['log_error_details'],
        $logger
    );

    // Add cors middleware
    $app->add(CorsMiddleware::class);
};
