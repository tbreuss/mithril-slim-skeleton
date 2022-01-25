<?php

use Aura\Sql\DecoratedPdo;
use Monolog\Handler\StreamHandler;
use Monolog\Logger;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseFactoryInterface;
use Psr\Log\LoggerInterface;
use Slim\App;
use Slim\Factory\AppFactory;

return [
    'settings' => function () {
        return require __DIR__ . '/settings.php';
    },

    App::class => function (ContainerInterface $container) {
        AppFactory::setContainer($container);

        $app = AppFactory::create();
        $app->setBasePath('/api');

        return $app;
    },

    ResponseFactoryInterface::class => function (ContainerInterface $container) {
        return $container->get(App::class)->getResponseFactory();
    },

    PDO::class => function (ContainerInterface $container) {
        $settings = $container->get('settings')['db'];

        // sqlite
        $path = $settings['path'];
        $flags = $settings['flags'];
        $dsn = "sqlite:$path";

        return new PDO($dsn, '', '', $flags);

    // mysql
        /*
        $host = $settings['host'];
        $dbname = $settings['database'];
        $username = $settings['username'];
        $password = $settings['password'];
        $charset = $settings['charset'];
        $flags = $settings['flags'];
        $dsn = "mysql:host=$host;dbname=$dbname;charset=$charset";

        return new PDO($dsn, $username, $password, $flags);
        */
    },

    DecoratedPdo::class => function (ContainerInterface $container) {
        $pdo = $container->get(PDO::class);

        return new DecoratedPdo($pdo);
    },

    LoggerInterface::class => function (ContainerInterface $c) {
        $settings = $c->get('settings')['logger'];

        $logger = new Logger($settings['name']);
        $handler = new StreamHandler($settings['path'], $settings['level']);
        $logger->pushHandler($handler);

        return $logger;
    },
];
