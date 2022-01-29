<?php

declare(strict_types = 1);

namespace App\Data;

final class OrganizationListOutput
{
    /**
     * @param OrganizationListDataOutput[] $data
     */
    public function __construct(
        public PaginationOutput $pagination,
        public array $data
    ) {
    }
}
