<?php

declare(strict_types = 1);

namespace App\Action\Contact;

use App\Data\ContactListDataOutput;
use App\Data\ContactListOutput;
use App\Data\PaginationInput;
use App\Service\OrganizationService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class ContactListAction
{
    private OrganizationService $organizationService;

    public function __construct(OrganizationService $organizationService)
    {
        $this->organizationService = $organizationService;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Get query params from request
        $params = $request->getQueryParams();
        $page = isset($params['page']) ? (int)$params['page'] : 1;
        $filter = isset($params['filter']) ? (string)$params['filter'] : '';

        // Create the request DTO
        $paginationInput = new PaginationInput($page, $filter);

        // Invoke the Domain with inputs and retain the response
        $userListOutput = $this->organizationService->listContacts($paginationInput);

        // Transform the result into the JSON representation
        $result = $this->transformResult($userListOutput);

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result, JSON_PRETTY_PRINT));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    private function transformResult(ContactListOutput $listOutput): array
    {
        return [
            'paging' => [
                'itemCountPerPage' => $listOutput->pagination->itemCountPerPage,
                'totalItemCount' => $listOutput->pagination->totalItemCount,
                'pageCount' => $listOutput->pagination->pageCount,
                'currentPage' => $listOutput->pagination->currentPage,
            ],
            'data' => array_map(function (ContactListDataOutput $data): array {
                return [
                    'id' => $data->id,
                    'fullName' => $data->fullName,
                    'city' => $data->city,
                    'phone' => $data->phone,
                    'organization' => $data->organization,
                ];
            }, $listOutput->data),
        ];
    }
}
