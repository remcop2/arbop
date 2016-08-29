<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Http\Controllers\EPController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;

class AnswerController extends EPController
{
	
	///////// API END POINTS
	
	//get all answers by manager id
	public function add(Request $request, $user_id) {
		try{
			$input = $request->all();
			$answers = $input["answers"];
			foreach($answers as $answer) {
				$answer["user_id"] = $user_id;
				Answer::create($answer);	
			}
			
			$this->response['status'] = "success";
			}catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = '';
				$this->response["exception"] = $e->getMessage();
			}finally{
				return Response::json($this->response, $this->statusCode);
			}
	}

	
	//get all answers by user id - indexed by question
	public function get(Request $request, $user_id) {
		try{
			$answers = Answer::where('user_id', $user_id)->get()->groupBy('question_id')->toArray();
			$this->response["answers"] = $answers;
			
			}catch (\Exception $e){
				$this->response["status"] = "error";
				$this->response["message"] = '';
				$this->response["exception"] = $e->getMessage();
			}finally{
				return Response::json($this->response, $this->statusCode);
			}
	}
	
	
}