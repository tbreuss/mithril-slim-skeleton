<?php

declare(strict_types = 1);

namespace App\Action\Organization;

use App\Service\OrganizationService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

final class OrganizationDetailAction
{
    private OrganizationService $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response,
        array $args
    ): ResponseInterface {
        $id = (int)$args['id'];

        // Invoke the Domain with inputs and retain the result
        $organization = $this->organizationService->getOrganizationById($id);

        if (is_null($organization)) {
            throw new HttpNotFoundException($request);
        }

        $contacts = $this->organizationService->getContactsByOrganizationId($id);

        // Transform the result into the JSON representation
        $result = [
            'organization' => $this->transformOrganization($organization),
            'contacts' => $this->transformContacts($contacts),
        ];

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result, JSON_PRETTY_PRINT));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    private function transformOrganization(array $organization): array
    {
        return [
            'id' => $organization['id'],
            'name' => $organization['name'],
            'email' => $organization['email'],
            'phone' => $organization['phone'],
            'address' => $organization['address'],
            'postalCode' => $organization['postal_code'],
            'city' => $organization['city'],
            'country' => $organization['country'],
        ];
    }

    private function transformContacts(array $contacts): array
    {
        return array_map(function (array $contact): array {
            return [
                'id' => $contact['id'],
                'fullName' => $contact['last_name'] . ' ' . $contact['first_name'],
                'phone' => $contact['phone'],
                'city' => $contact['city'],
            ];
        }, $contacts);
    }
}
