<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Manager extends Model
{
	
	protected $table = 'managers';
    protected $fillable = [
        'user_id'
    ];
	
	public function user() {
		return $this->belongsTo('User');
	}
	
}
