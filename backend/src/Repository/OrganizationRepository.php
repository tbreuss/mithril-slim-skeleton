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

    public function fetchContacts(int $offset, int $limit, string $filter): array
    {
        $params = ['limit' => $limit, 'offset' => $offset];
        $params = $this->addFilterParam($filter, $params);
        $where = $this->getFilterConditionForContactsQuery($filter);

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
            WHERE 1
            $where
            ORDER BY c.last_name, c.first_name
            LIMIT :limit
            OFFSET :offset
        SQL;

        return $this->connection->fetchAll($sql, $params);
    }

    public function countContacts(string $filter): int
    {
        $params = $this->addFilterParam($filter, []);
        $where = $this->getFilterConditionForContactsQuery($filter);

        $sql = <<<SQL
            SELECT
                COUNT(*) AS count
            FROM contacts AS c
            WHERE 1
            $where
        SQL;

        return (int)$this->connection->fetchValue($sql, $params);
    }

    public function fetchOrganizations(int $offset, int $limit, string $filter = ''): array
    {
        $params = ['limit' => $limit, 'offset' => $offset];
        $params = $this->addFilterParam($filter, $params);
        $where = $this->getFilterConditionForOrganizationQuery($filter);

        $sql = <<<SQL
            SELECT
                id,
                name,
                city,
                phone,
                email
            FROM organizations
            WHERE 1
            $where
            ORDER BY name
            LIMIT :limit
            OFFSET :offset
        SQL;

        return $this->connection->fetchAll($sql, $params);
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

    public function countOrganizations(string $filter = ''): int
    {
        $params = $this->addFilterParam($filter, []);
        $where = $this->getFilterConditionForOrganizationQuery($filter);

        $sql = <<<SQL
            SELECT
                COUNT(*) AS count
            FROM organizations
            WHERE 1
            $where
        SQL;

        return (int)$this->connection->fetchValue($sql, $params);
    }

    private function getFilterConditionForOrganizationQuery(string $filter = ''): string
    {
        if (strlen($filter) === 0) {
            return '';
        }

        return <<<SQL
            AND (
                name LIKE :filter
                OR email LIKE :filter
                OR phone LIKE :filter
                OR address LIKE :filter
                OR city LIKE :filter
                OR region LIKE :filter
                OR country LIKE :filter
                OR postal_code LIKE :filter
            )
        SQL;
    }

    private function getFilterConditionForContactsQuery(string $filter = ''): string
    {
        if (strlen($filter) === 0) {
            return '';
        }

        return <<<SQL
            AND (
                c.first_name LIKE :filter
                OR c.last_name LIKE :filter
                OR c.email LIKE :filter
                OR c.phone LIKE :filter
                OR c.address LIKE :filter
                OR c.city LIKE :filter
                OR c.region LIKE :filter
                OR c.country LIKE :filter
                OR c.postal_code LIKE :filter
            )
        SQL;
    }

    private function addFilterParam(string $filter, array $params = []): array
    {
        if (strlen($filter) > 0) {
            $params['filter'] = '%' . $filter . '%';
        }

        return $params;
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
