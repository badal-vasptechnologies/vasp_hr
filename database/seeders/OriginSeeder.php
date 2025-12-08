<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Origin;

class OriginSeeder extends Seeder
{
    public function run(): void
    {
        $origins = [
            'Naukri',
            'LinkedIn',
            'Indeed',
            'Company Website',
            'Referral',
            'Walk-in',
            'Friends and Family',
            'Referral',
            'Other'
        ];

        foreach ($origins as $name) {
            Origin::firstOrCreate(['name' => $name]);
        }
    }
}
