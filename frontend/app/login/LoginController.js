/**
 * Controller for Home page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .controller('LoginController', LoginController);

    LoginController.$inject = ["UserManager", "$scope", "$state", "User"];


    function LoginController(UserManager, $scope, $state, User) {
        var self = this;
        ////////////  VARS
		
		////////////  SCOPE
		//default login form vars
		$scope.form = {
			email: "test@manager.nl",
			password: "test"
		};
		
		$scope.test = "";
		

        ////////////  SCOPE FUNCTIONS
		$scope.login = function() {
			console.log("Logging in");
			
			UserManager.login({
				email: $scope.form.email,
				password: $scope.form.password,
			}).then(function (response) {
				if(response.status == "success") {
					if(User.isManager()) {
						$state.go("manager");	
					} else {
						$state.go("answering");	
					}
				} else {
					alert("Onjuiste inloggegevens.");
				}
			});
		};

    }


})();