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
        [$pageCount, $currentPage] = $this->calculate($page, $itemCountPerPage, $totalItemCount);
        $this->pageCount = $pageCount;
        $this->currentPage = $currentPage;
    }

    public function offset(): int
    {
        return ($this->currentPage - 1) * $this->itemCountPerPage;
    }

    public function limit(): int
    {
        return $this->itemCountPerPage;
    }

    private function calculate(int $page, int $itemCountPerPage, int $totalItemCount): array
    {
        if ($totalItemCount <= $itemCountPerPage) {
            return [1, 1];
        }
        $pageCount = (int)ceil($totalItemCount / $itemCountPerPage);
        $currentPage = min(max($page, 1), $pageCount);
        return [$pageCount, $currentPage];
    }
}
