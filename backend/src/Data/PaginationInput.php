<?php

declare(strict_types = 1);

namespace App\Data;

final class PaginationInput
{
    public function __construct(
        public int $page,
        public string $filter = ''
    ) {
    }
}
