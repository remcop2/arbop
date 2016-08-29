<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

//TODO: add middleware for authentication
//TODO: nest routes

Route::get('user/{user_id}', 'UserController@getUserById');
Route::post('user/createManager', 'UserController@createManager');
Route::post('user/login', 'UserController@login');

Route::post('company/create', 'CompanyController@create');

Route::get('manager/{manager_id}/employees', 'UserController@getEmployees');
Route::get('manager/{manager_id}/results', 'AnswerController@results');

Route::get('manager/{manager_id}/questions', 'QuestionController@get');
Route::post('manager/{manager_id}/questions', 'QuestionController@add');
Route::get('manager/{manager_id}/answers', 'AnswerController@get');

Route::post('employee/{user_id}/answers', 'AnswerController@add');
Route::get('employee/{user_id}/answers', 'AnswerController@get');
