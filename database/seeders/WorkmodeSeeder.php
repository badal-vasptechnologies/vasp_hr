<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Workmode;

class WorkmodeSeeder extends Seeder
{
    public function run()
    {
        $modes = [
            'Onsite',
            'Offsite',
            'Hybrid',
        ];

        foreach ($modes as $mode) {
            Workmode::create(['name' => $mode]);
        }
    }
}


