<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Origin extends Model
{
   protected $fillable = [
	    'name',
	    'api_endpoint',
	    'api_username',
	    'api_password',
	    'api_key',
	];

    public function candidates()
	{
	    return $this->hasMany(Candidate::class, 'origin_id');
	}

}
