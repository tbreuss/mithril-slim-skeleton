<?php

declare(strict_types=1);

use Phinx\Seed\AbstractSeed;

class UserSeeder extends AbstractSeed
{
    public function run()
    {
        $faker = Faker\Factory::create();
        $data = [];
        for ($i = 0; $i < 19; $i++) {
            $data[] = [
                'username'        => $faker->userName,
                'email'           => $faker->email,
                'owner'           => $faker->boolean,
                'password'        => password_hash($faker->numerify('########'), PASSWORD_DEFAULT),
                'first_name'      => $faker->firstName,
                'last_name'       => $faker->lastName,
                'created_at'      => date('Y-m-d H:i:s'),
                'updated_at'      => null,
                'deleted_at'      => null,
            ];
        }

        // this is for the demo login
        $data[] = [
            'username'        => 'demo',
            'email'           => $faker->email,
            'owner'           => true,
            'password'        => password_hash('demo', PASSWORD_DEFAULT),
            'first_name'      => $faker->firstName,
            'last_name'       => $faker->lastName,
            'created_at'      => date('Y-m-d H:i:s'),
            'updated_at'      => null,
            'deleted_at'      => null,
        ];

        $this->table('users')->insert($data)->saveData();
    }
}
