<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class Init extends AbstractMigration
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
            ->addColumn('password', 'string', ['limit' => 100])
            ->addColumn('first_name', 'string', ['limit' => 100])
            ->addColumn('last_name', 'string', ['limit' => 100])
            ->addColumn('created_at', 'datetime', ['null' => true])
            ->addColumn('updated_at', 'datetime', ['null' => true])
            ->addColumn('deleted_at', 'datetime', ['null' => true])
            ->create();

        $this->table('organizations')
            ->addColumn('name', 'string', ['limit' => 100])
            ->addColumn('email', 'string', ['limit' => 100])
            ->addColumn('phone', 'string', ['limit' => 20])
            ->addColumn('address', 'string', ['limit' => 100])
            ->addColumn('city', 'string', ['limit' => 100])
            ->addColumn('region', 'string', ['limit' => 100])
            ->addColumn('country', 'string', ['limit' => 2])
            ->addColumn('postal_code', 'string', ['limit' => 20])
            ->addColumn('created_at', 'datetime', ['null' => true])
            ->addColumn('updated_at', 'datetime', ['null' => true])
            ->addColumn('deleted_at', 'datetime', ['null' => true])
            ->create();

        $this->table('contacts')
            ->addColumn('organization_id', 'integer')
            ->addForeignKey(
                'organization_id',
                'organizations',
                'id',
                ['delete' => 'NO_ACTION', 'update' => 'NO_ACTION']
            )
            ->addColumn('first_name', 'string', ['limit' => 100])
            ->addColumn('last_name', 'string', ['limit' => 100])
            ->addColumn('email', 'string', ['limit' => 100])
            ->addColumn('phone', 'string', ['limit' => 20])
            ->addColumn('address', 'string', ['limit' => 100])
            ->addColumn('city', 'string', ['limit' => 100])
            ->addColumn('region', 'string', ['limit' => 100])
            ->addColumn('country', 'string', ['limit' => 2])
            ->addColumn('postal_code', 'string', ['limit' => 20])
            ->addColumn('created_at', 'datetime', ['null' => true])
            ->addColumn('updated_at', 'datetime', ['null' => true])
            ->addColumn('deleted_at', 'datetime', ['null' => true])
            ->create();
    }

    public function down(): void
    {
        $this->table('users')->drop()->save();
        $this->table('organizations')->drop()->save();
        $this->table('contacts')->drop()->save();
    }
}
