<?php

// Load dotenv file
$environment = $_ENV['ENVIRONMENT'] ?? 'production';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__), '.env.' . $environment);
$dotenv->load();

// Should be set to 0 in production
error_reporting((int)$_ENV['PHP_ERROR_REPORTING']);

// Should be set to '0' in production
ini_set('display_startup_errors', (string)$_ENV['PHP_DISPLAY_STARTUP_ERRORS']);
ini_set('display_errors', (string)$_ENV['PHP_DISPLAY_ERRORS']);

ini_set('log_errors', '1');
ini_set('error_log', dirname(__DIR__) . '/runtime/log/php-error.log');

// Timezone
date_default_timezone_set('Europe/Berlin');

// Settings
$settings = [];

// Path settings
$settings['root'] = dirname(__DIR__);

// Error Handling Middleware settings
$settings['error'] = [
    // Should be set to false in production
    'display_error_details' => (bool)$_ENV['API_DISPLAY_ERROR_DETAILS'],

    // Parameter is passed to the default ErrorHandler
    // View in rendered output by enabling the "displayErrorDetails" setting.
    // For the console and unit tests we also disable it
    'log_errors' => (bool)$_ENV['API_LOG_ERRORS'],

    // Display error details in error log
    'log_error_details' => (bool)$_ENV['API_LOG_ERROR_DETAILS'],
];

// Database settings
$settings['db'] = [
    // mysql
    /*
    'driver' => 'mysql',
    'host' => 'mysql.test',
    'username' => 'root',
    'password' => 'root',
    'database' => 'slim-playground',
    'charset' => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'flags' => [
        // Turn off persistent connections
        PDO::ATTR_PERSISTENT => false,
        // Enable exceptions
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        // Emulate prepared statements
        PDO::ATTR_EMULATE_PREPARES => true,
        // Set default fetch mode to array
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        // Set character set
        PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
    ],
    */
    // sqlite
    'path' => dirname(__DIR__, 1) . '/database/database.sqlite3',
    'flags' => [],
];

// Logger settings
$settings['logger'] = [
    'name' => (string)$_ENV['API_LOGGER_NAME'],
    'path' => __DIR__ . '/../runtime/log/app.log',
    'level' => (int)$_ENV['API_LOGGER_LEVEL'], // @see \Monolog\Logger,
];

return $settings;
