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
        // Get request params
        $params = $request->getQueryParams();
        $page = !empty($params['page']) ? $params['page'] : 1;

        // Invoke the request DTO
        $paginationInput = new PaginationInput($page);

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
