<?php

namespace App\Data;

final class OrganizationListDataOutput
{
    public function __construct(
        public int $id,
        public string $name,
        public string $city,
        public string $phone,
        public string $email
    ) {
    }
}
