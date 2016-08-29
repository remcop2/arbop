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

class UserController extends EPController
{
	//TODO: move to resource file
	private $defaultQuestions = [
		"Hoe gaat het op het werk?",
		"Hoe gaat het thuis?"
	];
	
	///////// API END POINTS
	
	//logs in user, also returns company
	public function login(Request $request) {
		try{
			$input = $request->all();
			$user = User::where('email', $input["email"])->first();
			
			$user = User::getById($user->id)->first();
			$this->response["user"] = $user;
			
			$this->response["company"] = Company::find($user->company_id);
			}catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = 'Onjuiste inloggegevens';
				$this->response["exception"] = $e->getMessage();
			}finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
	
	public function createManager(Request $request) {
		try{
			$input = $request->all();
			$fields = $request->only('name', 'email', 'password', 'company_id');
			$user = $this->createUser($fields);
			
			//create manager - link user by id
			$manager = new Manager;
			$manager->user_id = $user->id;
			$manager->save();
			
			//create default questions
			foreach($this->defaultQuestions as $questionText) {
				$fields["manager_id"] = $manager_id;
			
				$question = new Question;
				$question->manager_id = $manager->id;
				$question->question = $questionText;
				$question->save();
			}
			
			$this->response['manager_id'] = $manager->id;
			}catch (Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = '';
				$this->response["exception"] = $e->getMessage();
			}finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
	
	public function getEmployees(Request $request, $manager_id) {
		try {
			$input = $request->all();
			$employees = User::getEmployeeByManagerId($manager_id)->get();

			$this->response["employees"] = $employees;
			} catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = 'Onjuiste inloggegevens';
				$this->response["exception"] = $e->getMessage();
			} finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
	
	public function getUserById(Request $request, $user_id) {
		try {
			$input = $request->all();
			$user = User::find($user_id);

			$this->response["user"] = $user;
			} catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = 'Onjuiste inloggegevens';
				$this->response["exception"] = $e->getMessage();
			} finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
	
	///////// END - API END POINTS
	
	
	private function createUser($fields) {
		try {
			$user = User::create($fields);
			return $user;
		} catch (\Exception $e) {
			$this->response["status"] = "error";
			$this->response["message"] = 'Dit emailadres is al in gebruik';
			$this->response["exception"] = $e->getMessage();
		}
	}
}