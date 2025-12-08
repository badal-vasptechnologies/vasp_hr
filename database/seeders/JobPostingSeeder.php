<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\JobPosting;

class JobPostingSeeder extends Seeder
{
    public function run(): void
    {
        $jobs = [
            [
                'job_title' => 'Software Developer',
                'department' => 'IT',
                'location' => 'Mumbai',
                'description' => 'Responsible for developing and maintaining applications.',
                'work_mode' => 'Onsite',
                'start_date' => '2025-01-10',
                'status' => 0,
            ],
            [
                'job_title' => 'HR Executive',
                'department' => 'Human Resources',
                'location' => 'Delhi',
                'description' => 'Manage recruitment and employee relations.',
                'work_mode' => 'Offsite',
                'start_date' => '2025-02-01',
                'status' => 0,
            ],
            [
                'job_title' => 'Finance Analyst',
                'department' => 'Finance',
                'location' => 'Bangalore',
                'description' => 'Responsible for financial reporting and analysis.',
                'work_mode' => 'Onsite',
                'start_date' => '2025-03-05',
                'status' => 0,
            ],
        ];

        foreach ($jobs as $job) {
            JobPosting::create($job);
        }
    }
}
