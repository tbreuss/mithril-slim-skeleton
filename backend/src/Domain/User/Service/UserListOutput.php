<?php

declare(strict_types = 1);

namespace App\Domain\User\Service;

final class UserListOutput
{
    public function __construct(
        public int $id,
        public string $username,
        public string $firstName,
        public string $lastName,
        public string $email,
    ) {
    }
}
