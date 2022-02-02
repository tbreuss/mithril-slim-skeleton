<?php

declare(strict_types = 1);

use App\Handler\JsonErrorRenderer;
use App\Handler\ShutdownHandler;
use App\Middleware\CorsMiddleware;
use App\Middleware\ValidationExceptionMiddleware;
use Psr\Log\LoggerInterface;
use Slim\App;
use Slim\Factory\ServerRequestCreatorFactory;

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
    $errorMiddleware = $app->addErrorMiddleware(
        $settings['error']['display_error_details'],
        $settings['error']['log_errors'],
        $settings['error']['log_error_details'],
        $logger
    );

    // Add shutdown handler to catch notices and warnings
    $errorHandler = $errorMiddleware->getErrorHandler('default');
    $request = ServerRequestCreatorFactory::create()->createServerRequestFromGlobals();
    $shutdownHandler = new ShutdownHandler($request, $errorHandler, $settings['error']['display_error_details']);
    register_shutdown_function($shutdownHandler);

    // Add own JSON error handler to display more information
    $errorHandler->registerErrorRenderer('application/json', JsonErrorRenderer::class);

    // Add cors middleware
    $app->add(CorsMiddleware::class);
};
