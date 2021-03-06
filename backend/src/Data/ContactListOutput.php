<?php

declare(strict_types = 1);

namespace App\Data;

final class ContactListOutput
{
    /**
     * @param PaginationOutput $pagination
     * @param ContactListDataOutput[] $data
     */
    public function __construct(
        public PaginationOutput $pagination,
        public array $data
    ) {
    }
}
