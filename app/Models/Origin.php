<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Origin extends Model
{
    protected $fillable = ['name'];

    public function candidates()
	{
	    return $this->hasMany(Candidate::class, 'origin_id');
	}

}
