<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    protected $fillable = [
        'candidate_id',
        'platform',
        'meeting_id',
        'join_url',
        'start_url',
        'start_time',
    ];

    public function candidate()
    {
        return $this->belongsTo(Candidate::class,);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
