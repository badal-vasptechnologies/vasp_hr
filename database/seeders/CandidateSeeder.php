<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Models\Origin;
use App\Models\Candidate;

class CandidateSeeder extends Seeder
{
    public function run(): void
    {
        if (Candidate::count() > 0) return;
        $candidates = [];
        $originId = Origin::first()->id ?? null;
        for ($i = 1; $i <= 20; $i++) {
            $candidates[] = [
                'name' => 'Candidate ' . $i,
                'email' => 'candidate' . $i . '@example.com',
                'mobile' => '98765432' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'address' => 'Address for candidate ' . $i,
                'status' => ['Pending', 'Shortlisted', 'Rejected', 'Selected'][array_rand(['Pending', 'Shortlisted', 'Rejected', 'Selected'])],
                'date_of_apply' => now()->subDays(rand(1, 30))->toDateString(),
                'origin_id' => $originId,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        DB::table('candidates')->insert($candidates);
    }
}
