<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class ContactSeeder extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 438; $i++) {
            $data[] = [
                'organization_id' => rand(1, 100),
                'first_name'      => $faker->firstName,
                'last_name'       => $faker->lastName,
                'email'           => $faker->email,
                'phone'           => $faker->phoneNumber,
                'address'         => $faker->streetAddress,
                'city'            => $faker->city,
                'region'          => $faker->state,
                'country'         => $faker->countryCode,
                'postal_code'     => $faker->postcode,
                'created_at'      => date('Y-m-d H:i:s'),
                'updated_at'      => null,
                'deleted_at'      => null,
            ];
        }

        $this->table('contacts')->insert($data)->saveData();
    }
}
