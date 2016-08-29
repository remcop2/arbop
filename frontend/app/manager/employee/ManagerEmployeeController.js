/**
 * Controller for manager's employee page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .controller('ManagerEmployeeController', ManagerEmployeeController);

    ManagerEmployeeController.$inject = ["$scope", "$stateParams", "$localStorage", "SurveyManager", "UserManager", "ResultsManager"];


    function ManagerEmployeeController($scope, $stateParams, $localStorage, SurveyManager, UserManager, ResultsManager) {
        var self = this;
		////////////  VARS
		$scope.employee = {}
		$scope.questions = [];
		var activeQuestions = [];		//questions visible in graph
		var allAnswers = [];
		
		$scope.addingQuestionText = "";
		
		var _construct = function() {
			SurveyManager.questions($localStorage.user.manager_id)
				.then(function (response) {
				if(response.status == "success") {
					$scope.questions = response.questions;
					//makeChartData($scope.questions);
					console.log($scope.questions);
				} else {
					alert("Er is iets mis gegaan bij het ophalen van de employees.");
				}
			});
			
			ResultsManager.byUser($stateParams.user_id)
				.then(function (response) {
				if(response.status == "success") {
					$scope.answers = response.answers;
					allAnswers = response.answers;
					makeChartData(response.answers);
				} else {
					alert("Er is iets mis gegaan bij het ophalen van de vragen.");
				}
			});
			
			UserManager.getByUserId($stateParams.user_id)
				.then(function (response) {
				if(response.status == "success") {
					$scope.employee = response.user;
				} else {
					alert("Er is iets mis gegaan bij het ophalen van de vragen.");
				}
			});
		};

        ////////////  function definitions
		$scope.addQuestion = function() {
			SurveyManager.addQuestion($localStorage.user.manager_id, $scope.addingQuestionText)
			.then(function (response) {
				console.log(response);
				if(response.status == "success") {
					$scope.questions.push(response.question);
				} else {
					alert("Er is iets mis gegaan bij het ophalen van de vragen.");
				}
			});
		};
		
		/////////// graph settings
		$scope.labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7"];
		$scope.series = ['Series A', 'Series B'];
		$scope.data = [
			[65, 59, 80, 81, 56, 55, 40],
			[28, 48, 40, 19, 86, 27, 90]
		];
		$scope.datasetOverride = [{
			yAxisID: 'y-axis-1'
		}];
		$scope.options = {
			scales: {
				yAxes: [{
					id: 'y-axis-1',
					type: 'linear',
					display: true,
					position: 'left'
				}]
			}
		};
		////////////// end graph settings
		
		//feed answers, generate chart data in scope
		var makeChartData = function(answersIndexedByQuestion) {
			var answers = answersIndexedByQuestion;
			
			//fill these with answers data
			$scope.series = [];		//1 line
			$scope.data = [];		//contains arrays of integers
			
			for(question_id in answersIndexedByQuestion) {
				//check if question is in the array with active questions
				console.log(activeQuestions);
				console.log(question_id);
				if(_.indexOf(activeQuestions, parseInt(question_id)) < 0) console.log("aaaaa");
				if(_.indexOf(activeQuestions, parseInt(question_id)) < 0) continue;
				
				var answers = answersIndexedByQuestion[question_id];		//all answers of a single question, should be a single array in data
				var scores = [];
				for(j in answers) {
					//iterate answers, add to data
					var answer = answers[j];
					scores.push(answer.score);
				}
				$scope.data.push(scores);
				$scope.series.push("Vraag " + answers[0].question_id);
			}
			
		};
		
		$scope.questionIsActive = function(question_id) {
			if(_.indexOf(activeQuestions, question_id) < 0) return false;
			return true;
		};
		
		//toggle questions in graph
		$scope.toggleQuestion = function(question_id) {
			//check if question is in the array with active questions
			if(_.indexOf(activeQuestions, question_id) < 0) {
				//not in array, add it
				activeQuestions.push(question_id);
			} else {
				//if it is, remove it
				activeQuestions = _.without(activeQuestions, question_id);
			}
			//rebuild chart data
			makeChartData(allAnswers)
		};
		
		//gets nr of answers for question_id
		$scope.getAnswerCount = function(question_id) {
			//check for undefined index 
			console.log(_.keys(allAnswers));
			if(!_.contains(_.keys(allAnswers), String(question_id))) return 0;
			return _.size(allAnswers[question_id]);
		};
		
		_construct();
    }


})();