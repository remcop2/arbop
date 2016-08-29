<?php

use App\User;
use App\Employee;
use App\Company;
use App\Manager;
use App\Question;
use App\Answer;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
	//TODO: move to resource file
	private $defaultQuestions = [
		"Hoe gaat het op het werk?",
		"Hoe gaat het thuis?"
	];
	
    /**
     * Run the database seeds.
     */
    public function run()
    {
		
		$fields = [
			'name' => str_random(10),
			'slug' => str_random(4),
			'theme_color' => "#030303",
			'theme_accent_color' => "#66aeae"
		];	
		$company = Company::create($fields);

		//create 1 manager
		$fields = [
			'name' => str_random(10),
			'email' => str_random(10) . "@test.nl",
			'password' => "test",
			'company_id' => $company->id
		];	
		$managerUser = User::create($fields);
		$fields = [
			'user_id' => $managerUser->id 
		];
		$manager = Manager::create($fields);
		
		//add 2 questions to manager
		$questionIds = [];
		foreach($this->defaultQuestions as $questionText) {
			$fields["manager_id"] = $manager->id;

			$question = new Question;
			$question->manager_id = $manager->id;
			$question->question = $questionText;
			$question->save();
			
			$questionIds[] = $question->id;
		}

		//create 10 employees
		foreach (range(1, 10) as $i) {
			$fields = [
				'name' => str_random(10),
				'email' => str_random(10) . "@test.nl",
				'password' => "test",
				'company_id' =>  $company->id
			];	
			$employeeUser = User::create($fields);
			
			$fields = [
				'user_id' => $employeeUser->id,
				'employee_manager_id' => $manager->id
			];
			$employee = Employee::create($fields);
			
			//answer questions for each employee
			foreach (range(1, 20) as $i) {
				$fields = [
					"question_id" => $questionIds[mt_rand(0, sizeof($questionIds) - 1)],
					"score" => mt_rand(1,10),
					"user_id" => $employee->id
				];
				Answer::create($fields);
			}
		}
        // $this->call(UsersTableSeeder::class);
		
    }
}
