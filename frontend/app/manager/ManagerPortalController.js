/**
 * Controller for Home page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .controller('ManagerPortalController', ManagerPortalController);

    ManagerPortalController.$inject = ["$scope", "$localStorage", "SurveyManager", "UserManager"];


    function ManagerPortalController($scope, $localStorage, SurveyManager, UserManager) {
        var self = this;
		////////////  VARS
        $scope.employees = [];
		$scope.questions = [];
		$scope.test = "";
		
		$scope.addingQuestionText = "";
		
		var _construct = function() {
			SurveyManager.questions($localStorage.user.manager_id)
				.then(function (response) {
				if(response.status == "success") {
					$scope.questions = response.questions;
					console.log($scope.questions);
				} else {
					alert("Er is iets mis gegaan bij het ophalen van de employees.");
				}
			});
			
			UserManager.getEmployeesByManagerId($localStorage.user.manager_id)
				.then(function (response) {
				if(response.status == "success") {
					$scope.employees = response.employees;
					console.log($scope.employees);
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
		
		_construct();
    }


})();