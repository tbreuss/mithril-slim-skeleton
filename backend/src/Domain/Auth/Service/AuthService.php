<?php

declare(strict_types = 1);

namespace App\Domain\Auth\Service;

use App\Exception\ValidationException;

final class AuthService
{
    public function login(array $data): void
    {
        $this->validateCredentials($data);
    }

    private function validateCredentials(array $data): void
    {
        $errors = [];

        if (empty($data['username'])) {
            $errors['username'] = 'Input required';
        }

        if (empty($data['password'])) {
            $errors['password'] = 'Input required';
        }

        $usernameOrPasswordInvalid = false;

        if (!empty($data['username']) && !empty($data['password'])) {
            if ($data['username'] !== $_ENV['API_ADMIN_USERNAME']) {
                $usernameOrPasswordInvalid = true;
            }
            if (!password_verify($data['password'], $_ENV['API_ADMIN_PASSWORD'])) {
                $usernameOrPasswordInvalid = true;
            }
        }

        if ($usernameOrPasswordInvalid === true) {
            $errors['password'] = 'Username or password invalid';
        }

        if ($errors) {
            throw new ValidationException('Please check your input', $errors);
        }
    }
}
