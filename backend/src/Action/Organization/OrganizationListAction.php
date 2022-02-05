<?php

declare(strict_types = 1);

namespace App\Action\Organization;

use App\Data\OrganizationListDataOutput;
use App\Data\OrganizationListOutput;
use App\Data\PaginationInput;
use App\Service\OrganizationService;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;

final class OrganizationListAction
{
    private OrganizationService $userService;

    public function __construct(OrganizationService $userService)
    {
        $this->userService = $userService;
    }

    public function __invoke(
        ServerRequestInterface $request,
        ResponseInterface $response
    ): ResponseInterface {
        // Get query params from request
        $params = $request->getQueryParams();
        $page = (int)$params['page'] ?? 1;
        $filter = (string)$params['filter'] ?? '';

        // Create the request DTO
        $paginationInput = new PaginationInput($page, $filter);

        // Invoke the Domain with inputs and retain the response
        $userListOutput = $this->userService->listOrganizations($paginationInput);

        // Transform the result into the JSON representation
        $result = $this->transformResult($userListOutput);

        // Build the HTTP response
        $response->getBody()->write((string)json_encode($result, JSON_PRETTY_PRINT));

        return $response
            ->withHeader('Content-Type', 'application/json')
            ->withStatus(200);
    }

    private function transformResult(OrganizationListOutput $organizationListResponse): array
    {
        return [
            'paging' => [
                'itemCountPerPage' => $organizationListResponse->pagination->itemCountPerPage,
                'totalItemCount' => $organizationListResponse->pagination->totalItemCount,
                'pageCount' => $organizationListResponse->pagination->pageCount,
                'currentPage' => $organizationListResponse->pagination->currentPage,
            ],
            'data' => array_map(function (OrganizationListDataOutput $organization): array {
                return [
                    'id' => $organization->id,
                    'name' => $organization->name,
                    'city' => $organization->city,
                    'phone' => $organization->phone,
                    'email' => $organization->email,
                ];
            }, $organizationListResponse->data),
        ];
    }

    private function getPageParam(ServerRequestInterface $request): int
    {
        $params = $request->getQueryParams();
        return isset($params['page']) ? (int)$params['page'] : 1;
    }
}
