<?php

namespace App\Data;

final class ContactListOutput
{
    /**
     * @param ContactListDataOutput[] $data
     * @param publicPaginationOutput $pagination
     */
    public function __construct(
        public PaginationOutput $pagination,
        public array $data
    ) {
    }
}
