<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateUserTable extends AbstractMigration
{
    public function up(): void
    {
        $this->table('users')
            ->addColumn('username', 'string', ['limit' => 50])
            ->addIndex('username', [
                'unique' => true,
                'name' => 'idx_username',
            ])
            ->addColumn('email', 'string', ['limit' => 100])
            ->addColumn('owner', 'string', ['limit' => 20])
            ->addColumn('password', 'string', ['limit' => 255]) // for future password length
            ->addColumn('first_name', 'string', ['limit' => 100])
            ->addColumn('last_name', 'string', ['limit' => 100])
            ->addColumn('created_at', 'datetime', ['null' => true])
            ->addColumn('updated_at', 'datetime', ['null' => true])
            ->addColumn('deleted_at', 'datetime', ['null' => true])
            ->create();
    }

    public function down(): void
    {
        $this->table('users')->drop()->save();
    }
}
