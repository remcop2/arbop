/**
 * Controller for Home page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .controller('AnsweringController', AnsweringController);

    AnsweringController.$inject = ["UserManager", "$scope", "$state", "SurveyManager", "$localStorage"];


    function AnsweringController(UserManager, $scope, $state, SurveyManager, $localStorage) {
        var self = this;
		//rough state machine to control view
		$scope.viewState = {
			current: "start",
			possible: ["start", "answers-sending", "answers-sent"],
			set: function(state) {
				if(!_.contains(this.possible, state)) {
					console.error("impossible view state; " + state);
					return;
				}
				this.current = state;
			},
			is: function(state) {
				if(!_.contains(this.possible, state)) {
					console.error("impossible view state; " + state);
					return false;
				}
				return this.current == state;
			}
		};
			
		
		var _construct = function() {
			SurveyManager.questions($localStorage.user.employee_manager_id)
				.then(function (response) {
				if(response.status == "success") {
					var questions = response.questions;
					//set default score to 5
					for(var i in questions) {
						questions[i].score = 5;
					}
					$scope.questions = questions;
				} else {
					alert("Er is iets mis gegaan bij het ophalen van de vragen.");
				}
			});
		};
		
        ////////////  SCOPE VARS
		$scope.questions = [];
		$scope.isLoading = false; //still loading questions from API
		
		////////////  SCOPE FUNCTIONS
		//default login form vars
		$scope.sendAnswers = function() {
			var questions = $scope.questions;
			for(var i in questions) {
				questions[i].question_id = questions[i].id;
			}
			
			$scope.viewState.set("answers-sending");
			
			SurveyManager.answer($localStorage.user.id, $scope.questions)
			.then(function (response) {
				if(response.status == "success") {
					//$scope.questions = response.questions;
					$scope.viewState.set("answers-sent");
				} else {
					console.error(response);
					alert("Er is iets mis gegaan bij het opslaan van de antwoorden.");
				}
			});
		};
		

        _construct();
    }


})();