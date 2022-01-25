<?php

namespace App\Data;

final class ContactListDataOutput
{
    public function __construct(
        public int $id,
        public string $fullName,
        public string $city,
        public string $phone,
        public string $organization
    ) {
    }
}
