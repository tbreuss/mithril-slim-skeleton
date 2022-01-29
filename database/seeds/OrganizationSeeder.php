<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class OrganizationSeeder extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 100; $i++) {
            $data[] = [
                'name'          => $faker->company,
                'email'         => $faker->email,
                'phone'         => $faker->phoneNumber,
                'address'       => $faker->streetAddress,
                'city'          => $faker->city,
                'region'        => $faker->state,
                'country'       => $faker->countryCode,
                'postal_code'   => $faker->postcode,
                'created_at'    => date('Y-m-d H:i:s'),
                'updated_at'    => null,
                'deleted_at'    => null,
            ];
        }

        $this->table('organizations')->insert($data)->saveData();
    }
}
