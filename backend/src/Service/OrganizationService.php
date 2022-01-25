<?php

namespace App\Service;

use App\Data\ContactListDataOutput;
use App\Data\ContactListOutput;
use App\Data\OrganizationListDataOutput;
use App\Data\OrganizationListOutput;
use App\Data\PaginationInput;
use App\Data\PaginationOutput;
use App\Repository\OrganizationRepository;

final class OrganizationService
{
    private OrganizationRepository $repository;

    public function __construct(OrganizationRepository $repository)
    {
        $this->repository = $repository;
    }

    public function listContacts(PaginationInput $input): ContactListOutput
    {
        // see https://docs.laminas.dev/laminas-paginator/usage/
        $pagination = new PaginationOutput(
            $input->page,
            $this->repository->countContacts()
        );

        // sql offset / limit
        $offset = ($pagination->currentPage - 1) * $pagination->itemCountPerPage;
        $limit = $pagination->itemCountPerPage;

        $rows = $this->repository->fetchContacts($offset, $limit);

        $data = array_map(function (array $row): ContactListDataOutput {
            return new ContactListDataOutput(
                (int)$row['id'],
                (string)($row['last_name'] . ' ' . $row['first_name']),
                (string)$row['city'],
                (string)$row['phone'],
                (string)$row['company_name'],
            );
        }, $rows);

        return new ContactListOutput($pagination, $data);
    }

    public function getContactById(int $id): ?array
    {
        $row = $this->repository->fetchContact($id);
        if (is_null($row)) {
            return null;
        }

        return [
            'id' => (int)$row['id'],
            'fullName' => (string)($row['last_name'] . ' ' . $row['first_name']),
            'email' => (string)$row['email'],
            'phone' => (string)$row['phone'],
            'address' => (string)$row['address'],
            'postalCode' => (string)$row['postal_code'],
            'city' => (string)$row['city'],
            'country' => (string)$row['country'],
            'organization' => [
                'id' => (int)$row['organization_id'],
                'name' => (string)$row['organization_name'],
            ],
        ];
    }

    public function listOrganizations(PaginationInput $input): OrganizationListOutput
    {
        // see https://docs.laminas.dev/laminas-paginator/usage/
        $pagination = new PaginationOutput(
            $input->page,
            $this->repository->countOrganizations()
        );

        // sql offset / limit
        $offset = ($pagination->currentPage - 1) * $pagination->itemCountPerPage;
        $limit = $pagination->itemCountPerPage;

        $rows = $this->repository->fetchOrganizations($offset, $limit);

        $data = array_map(function (array $row): OrganizationListDataOutput {
            return new OrganizationListDataOutput(
                (int)$row['id'],
                (string)$row['name'],
                (string)$row['city'],
                (string)$row['phone'],
                (string)$row['email'],
            );
        }, $rows);

        return new OrganizationListOutput($pagination, $data);
    }

    public function getOrganizationById(int $id): ?array
    {
        return $this->repository->fetchOrganization($id);
    }

    public function getContactsByOrganizationId(int $id): array
    {
        return $this->repository->fetchContactsByOrganizationId($id);
    }
}
