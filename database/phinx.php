<?php

return
[
    'paths' => [
        'migrations' => '%%PHINX_CONFIG_DIR%%/migrations',
        'seeds' => '%%PHINX_CONFIG_DIR%%/seeds'
    ],
    'environments' => [
        'default_migration_table' => 'phinxlog',
        'default_environment' => 'development',
        'development' => [
            'adapter' => 'sqlite',
            'name' => './database.dev',
            'suffix' => 'sqlite3',
        ],
        'testing' => [
            'adapter' => 'sqlite',
            'memory' => 'true',
        ]
    ],
    'version_order' => 'creation'
];
