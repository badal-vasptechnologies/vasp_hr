<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobPosting extends Model
{
    /** @use HasFactory<\Database\Factories\JobPostingFactory> */
    use HasFactory;
    protected $fillable = [
        'job_title',
        'department',
        'location',
        'description',
        'work_mode',
        'start_date'
    ];
}
