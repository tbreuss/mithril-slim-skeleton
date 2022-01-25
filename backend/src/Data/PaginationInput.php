<?php

namespace App\Data;

final class PaginationInput
{
    public function __construct(
        public int $page
    ) {
    }
}
