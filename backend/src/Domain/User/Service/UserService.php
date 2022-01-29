<?php

declare(strict_types = 1);

namespace App\Domain\User\Service;

use App\Data\PaginationInput;
use App\Data\PaginationOutput;
use App\Domain\User\Repository\UserRepository;
use App\Exception\ValidationException;
use Psr\Log\LoggerInterface;

final class UserService
{
    private UserRepository $repository;

    private LoggerInterface $logger;

    public function __construct(UserRepository $repository, LoggerInterface $logger)
    {
        $this->repository = $repository;
        $this->logger = $logger;
    }

    public function listUser(PaginationInput $input): array
    {
        // see https://docs.laminas.dev/laminas-paginator/usage/
        $pagination = new PaginationOutput(
            $input->page,
            $this->repository->countUsers()
        );

        // sql offset / limit
        $offset = ($pagination->currentPage - 1) * $pagination->itemCountPerPage;
        $limit = $pagination->itemCountPerPage;

        $rows = $this->repository->fetchUsers($offset, $limit);

        $data = array_map(function (array $row): UserListOutput {
            return new UserListOutput(
                $row['id'],
                $row['username'],
                $row['first_name'],
                $row['last_name'],
                $row['email']
            );
        }, $rows);

        return [$pagination, $data];
    }

    public function getUserById(int $id): ?array
    {
        return $this->repository->fetchUser($id);
    }

    public function createUser(array $data): int
    {
        // Input validation
        $this->validateNewUser($data);

        // Insert user
        $userId = $this->repository->insertUser($data);

        // Logging here: User created successfully
        $this->logger->info(sprintf('User "%s" created successfully', $userId));

        return $userId;
    }

    public function updateUser(int $id, array $data): int
    {
        // Input validation
        $this->validateNewUser($data);

        // Update user
        $this->repository->updateUser($id, $data);

        // Logging here: User created successfully
        $this->logger->info(sprintf('User "%s" updated successfully', $id));

        return $id;
    }

    public function deleteUser(int $id): void
    {
        $this->repository->deleteUser($id);
    }

    private function validateNewUser(array $data): void
    {
        $errors = [];

        // Here you can also use your preferred validation library

        if (empty($data['username'])) {
            $errors['username'] = 'Input required';
        }

        if (empty($data['email'])) {
            $errors['email'] = 'Input required';
        } elseif (filter_var($data['email'], FILTER_VALIDATE_EMAIL) === false) {
            $errors['email'] = 'Invalid email address';
        }

        if (empty($data['firstName'])) {
            $errors['firstName'] = 'Input required';
        }

        if (empty($data['lastName'])) {
            $errors['lastName'] = 'Input required';
        }

        if ($errors) {
            $this->logger->error('Validation error', $errors);
            throw new ValidationException('Please check your input', $errors);
        }
    }
}
