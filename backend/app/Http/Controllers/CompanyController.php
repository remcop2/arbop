<?php

namespace App\Http\Controllers;

use App\User;
use App\Employee;
use App\Company;
use App\Manager;
use App\Http\Controllers\EPController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;

class CompanyController extends EPController
{
	public function create(Request $request) {
		try{
			$statusCode = 200;
			$response = [
				'company_id'  => "",
			];

			$input = $request->all();
			$fields = $request->only('name', 'slug', 'theme_color', 'theme_accent_color');
			$user = Company::create($fields);

			print_r($user);


			}catch (Exception $e){
				$statusCode = 400;
			}finally{
				return Response::json($response, $statusCode);
			}
	}
	
}