<?php

declare(strict_types = 1);

namespace App\Domain\Auth\Service;

use App\Domain\User\Repository\UserRepository;
use App\Exception\ValidationException;

final class AuthService
{
    private UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

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
            if (!$this->userRepository->authenticateUser($data['username'], $data['username'])) {
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
