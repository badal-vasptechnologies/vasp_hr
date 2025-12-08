<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    /** @use HasFactory<\Database\Factories\CandidateFactory> */
    use HasFactory;
    protected $fillable = [
        'name',
        'email',
        'mobile',
        'address',
        'status',
        'date_of_apply',
        'origin_id'
    ];

    public function origin()
    {
        return $this->belongsTo(Origin::class, 'origin_id');
    }
}
