<?php

declare(strict_types = 1);

namespace App\Repository;

use Aura\Sql\DecoratedPdo;

final class OrganizationRepository
{
    private DecoratedPdo $connection;

    public function __construct(DecoratedPdo $connection)
    {
        $this->connection = $connection;
    }

    public function fetchContacts(int $offset, int $limit): array
    {
        $sql = <<<SQL
            SELECT
                c.id,
                c.first_name,
                c.last_name,
                c.city,
                c.phone,
                c.email,
                o.name AS company_name
            FROM contacts c
            INNER JOIN organizations o ON c.organization_id = o.id
            ORDER BY c.last_name, c.first_name
            LIMIT :limit
            OFFSET :offset
        SQL;

        return $this->connection->fetchAll($sql, [
            'limit' => $limit,
            'offset' => $offset,
        ]);
    }

    public function countContacts(): int
    {
        $sql = <<<SQL
            SELECT
                COUNT(*) AS count
            FROM contacts
        SQL;

        return (int)$this->connection->fetchValue($sql);
    }

    public function fetchOrganizations(int $offset, int $limit): array
    {
        $sql = <<<SQL
            SELECT
                id,
                name,
                city,
                phone,
                email
            FROM organizations
            ORDER BY name
            LIMIT :limit
            OFFSET :offset
        SQL;

        return $this->connection->fetchAll($sql, [
            'limit' => $limit,
            'offset' => $offset,
        ]);
    }

    public function fetchContact(int $id): ?array
    {
        $sql = <<<SQL
            SELECT
                c.id,
                c.first_name,
                c.last_name,
                c.email,
                c.phone,
                c.address,
                c.postal_code,
                c.city,
                c.country,
                o.id AS organization_id,
                o.name AS organization_name
            FROM contacts c
            LEFT JOIN organizations o ON o.id = c.organization_id
            WHERE c.id=:id
        SQL;

        $one = $this->connection->fetchOne($sql, [
            'id' => $id,
        ]);

        return is_array($one) ? $one : null;
    }

    public function countOrganizations(): int
    {
        $sql = <<<SQL
            SELECT
                COUNT(*) AS count
            FROM organizations
        SQL;

        return (int)$this->connection->fetchValue($sql);
    }

    public function fetchOrganization(int $id): ?array
    {
        $sql = <<<SQL
            SELECT
                id,
                name,
                email,
                phone,
                address,
                postal_code,
                city,
                country
            FROM organizations
            WHERE id=:id
        SQL;

        $one = $this->connection->fetchOne($sql, [
            'id' => $id,
        ]);

        return is_array($one) ? $one : null;
    }

    public function fetchContactsByOrganizationId(int $id): array
    {
        $sql = <<<SQL
            SELECT
                id,
                first_name,
                last_name,
                city,
                phone
            FROM contacts
            WHERE organization_id=:id
            ORDER BY last_name, first_name
        SQL;

        return $this->connection->fetchAll($sql, [
            'id' => $id,
        ]);
    }
}
