<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Location;

class LocationSeeder extends Seeder
{
    public function run()
    {
        $locations = [
            'STPI',
            'ABC',
            'Hyderabad',
            'Mumbai',
            'Remote',
        ];

        foreach ($locations as $loc) {
            Location::create(['name' => $loc]);
        }
    }
}

