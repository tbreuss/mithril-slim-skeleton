<?php

declare(strict_types = 1);

namespace App\Data;

final class PaginationOutput
{
    public int $itemCountPerPage;
    public int $totalItemCount;
    public int $pageCount;
    public int $currentPage;

    public function __construct(int $page, int $totalItemCount, int $itemCountPerPage = 10)
    {
        $this->itemCountPerPage = $itemCountPerPage;
        $this->totalItemCount = $totalItemCount;
        $this->pageCount = (int)floor($totalItemCount / $itemCountPerPage);
        $this->currentPage = min(max($page, 1), $this->pageCount);
    }

    public function offset(): int
    {
        return ($this->currentPage - 1) * $this->itemCountPerPage;
    }

    public function limit(): int
    {
        return $this->itemCountPerPage;
    }
}
