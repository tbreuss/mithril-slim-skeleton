<?php

declare(strict_types=1);

use Phinx\Migration\AbstractMigration;

final class CreateOrganizationTable extends AbstractMigration
{
    public function up(): void
    {
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
    }

    public function down(): void
    {
        $this->table('organizations')->drop()->save();
    }
}
