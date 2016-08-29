<?php

namespace App\Http\Controllers;

use App\Question;
use App\Http\Controllers\EPController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;

class QuestionController extends EPController
{
	
	///////// API END POINTS
	
	//get all questions by manager id
	public function get(Request $request, $manager_id) {
		try{
			$questions = Question::where('manager_id', $manager_id)->get();
			$this->response["questions"] = $questions;
			}catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = '';
				$this->response["exception"] = $e->getMessage();
			}finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
	
	//get all questions by manager id
	public function add(Request $request, $manager_id) {
		try{
			$statusCode = 200;
			$response = [
				'questions'  => [],
			];

			$input = $request->all();
			$fields = $request->only('manager_id', 'question');
			$fields["manager_id"] = $manager_id;
			
			$question = Question::create($fields);
			$this->response['question'] = $question;
			
			$this->response['status'] = "success";
			}catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = '';
				$this->response["exception"] = $e->getMessage();
			}finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
}