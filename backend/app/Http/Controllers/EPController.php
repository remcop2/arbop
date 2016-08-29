<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\Controller;

/*
	Controller for API end points
*/

abstract class EPController extends Controller
{
	public $statusCode = 200;
	public $response = [ 
		"status" => "success",
		"message" => "",
		"error" => ""
	];
	
}