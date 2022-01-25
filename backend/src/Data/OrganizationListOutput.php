<?php

namespace App\Data;

final class OrganizationListOutput
{
    /**
     * @param OrganizationListDataOutput[] $data
     * @param publicPaginationOutput $pagination
     */
    public function __construct(
        public PaginationOutput $pagination,
        public array $data
    ) {
    }
}
