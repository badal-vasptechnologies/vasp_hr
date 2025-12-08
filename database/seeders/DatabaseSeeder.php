<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Department;
use App\Models\Candidate;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            LocationSeeder::class,
            WorkmodeSeeder::class,
            OriginSeeder::class,
            CandidateSeeder::class,
        ]);

        $departments = [
            ['name' => 'Human Resources', 'code' => 'HR', 'description' => 'Handles employee management and policies.'],
            ['name' => 'Finance', 'code' => 'FIN', 'description' => 'Manages company finances.'],
            ['name' => 'IT Department', 'code' => 'IT', 'description' => 'Handles software, hardware, and tech support.'],
            ['name' => 'Sales', 'code' => 'SALES', 'description' => 'Manages sales and customer relations.'],
        ];

        foreach ($departments as $dept) {
            Department::firstOrCreate(
                ['code' => $dept['code']], // unique column to check
                $dept                      // values to insert if not exist
            );
        }

        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password')
            ]
        );
    }
}
