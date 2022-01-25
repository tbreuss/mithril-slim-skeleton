<?php

namespace App\Domain\User\Repository;

use Aura\Sql\DecoratedPdo;

final class UserRepository
{
    private DecoratedPdo $connection;

    public function __construct(DecoratedPdo $connection)
    {
        $this->connection = $connection;
    }

    /**
     * Insert user row.
     *
     * @param array $user The user
     *
     * @return int The new ID
     */
    public function insertUser(array $user): int
    {
        $row = [
            'username' => $user['username'],
            'first_name' => $user['firstName'],
            'last_name' => $user['lastName'],
            'email' => $user['email'],
        ];

        $sql = <<<SQL
            INSERT INTO users (username, email, first_name, last_name)
            VALUES (:username, :email, :first_name, :last_name);
        SQL;

        $this->connection->prepare($sql)->execute($row);

        return (int)$this->connection->lastInsertId();
    }

    public function updateUser(int $id, array $user): bool
    {
        $row = [
            'id' => $id,
            'username' => $user['username'],
            'first_name' => $user['firstName'],
            'last_name' => $user['lastName'],
            'email' => $user['email'],
        ];

        $sql = <<<SQL
            UPDATE users
            SET
                username=:username,
                first_name=:first_name,
                last_name=:last_name,
                email=:email
            WHERE id=:id;
        SQL;

        return $this->connection->prepare($sql)->execute($row);
    }

    public function deleteUser(int $id): void
    {
        $sql = <<<SQL
            DELETE FROM users
            WHERE id=:id;
        SQL;
        $this->connection->prepare($sql)->execute(['id' => $id]);
    }

    public function fetchUsers(int $offset, int $limit): array
    {
        $sql = <<<SQL
            SELECT id, username, first_name, last_name, email
            FROM users
            ORDER BY username
            LIMIT :limit
            OFFSET :offset
        SQL;

        return $this->connection->fetchAll($sql, [
            'limit' => $limit,
            'offset' => $offset,
        ]);
    }

    public function countUsers(): int
    {
        $sql = <<<SQL
            SELECT COUNT(*) AS count
            FROM users
        SQL;

        return (int)$this->connection->fetchValue($sql);
    }

    public function fetchUser(int $id): ?array
    {
        $sql = <<<SQL
            SELECT id, username, first_name, last_name, email
            FROM users
            WHERE id=:id
            ORDER BY username
        SQL;

        $one = $this->connection->fetchOne($sql, [
            'id' => $id,
        ]);

        return is_array($one) ? $one : null;
    }
}
