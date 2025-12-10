<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Documents extends Model
{
    /** @use HasFactory<\Database\Factories\DocumentsFactory> */
    use HasFactory;
    protected $fillable = [
        'candidate_id',
        'file_path',
        'file_type',
        'status'
    ];

    public function candidate()
	{
	    return $this->belongsTo(Candidate::class);
	}
}
