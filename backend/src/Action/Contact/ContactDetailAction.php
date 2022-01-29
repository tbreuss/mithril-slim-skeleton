<?php

declare(strict_types = 1);

namespace App\Action\Contact;

use App\Service\OrganizationService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Slim\Exception\HttpNotFoundException;

final class ContactDetailAction
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
        $contact = $this->organizationService->getContactById($id);

        if (is_null($contact)) {
            throw new HttpNotFoundException($request);
        }

        // Transform the result into the JSON representation
        $result = $this->transformResult($contact);

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result, JSON_PRETTY_PRINT));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    private function transformResult(array $contact): array
    {
        return [
            'id' => $contact['id'],
            'fullName' => $contact['fullName'],
            'email' => $contact['email'],
            'phone' => $contact['phone'],
            'address' => $contact['address'],
            'postalCode' => $contact['postalCode'],
            'city' => $contact['city'],
            'country' => $contact['country'],
            'organization' => [
                'id' => $contact['organization']['id'],
                'name' => $contact['organization']['name'],
            ],
        ];
    }
}
