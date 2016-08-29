<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;


class User extends Model
{

	protected $table = 'users';
	protected $fillable = [
		'name', 'email', 'password', 'company_id'
	];

	protected $hidden = [
		'password', 'remember_token',
	];
	
	//will return user with either a manager_id or employee_id
	public static function getById($id) {
		return DB::table('users')
			->where('users.id', $id)
            ->leftJoin('managers', 'managers.user_id', '=', 'users.id')
			->leftJoin('employees', 'employees.user_id', '=', 'users.id')
			->select('managers.*', 'employees.*', 'users.*', 'managers.id AS manager_id', 'employees.id AS employee_id');
	}
	
	//get employees under a manager
	public static function getEmployeeByManagerId($manager_id) {
		return DB::table('users')
			->leftJoin('employees', 'employees.user_id', '=', 'users.id')
			->select('employees.*', 'users.*', 'employees.id AS employee_id')
			->where('employees.employee_manager_id', $manager_id) ;
	}
}
