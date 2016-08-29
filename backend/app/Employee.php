<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
	protected $table = 'employees';
	
	protected $fillable = [
		'user_id', 'employee_manager_id'
	];
	
	public function user() {
		return $this->belongsTo('User');
	}
}
