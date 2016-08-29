/**
 * Model for currently logged in user
 *
 */
(function() {
    angular
        .module('arboplaats.api')
        .service('User', User);

    User.$inject = ["$localStorage", "$state"];
	
    function User($localStorage, $state) {
        var self = this;
		var possibleUserTypes = ["manager", "employee"];
        
		this.getUser = function() {
			if(_.isNull($localStorage.user)) return false;
			return $localStorage.user;
		};
		
		this.getUserType = function() {
			if(_.isNull($localStorage.user.type)) return false;
			return $localStorage.user.type;
		};
		
		this.setUserType = function(type) {
			if(_.indexOf(possibleUserTypes, type) == -1) {
				console.warn("impossible user type");
			} else {
				$localStorage.user.type = type;
			}
		};
		this.logout = function(goToLogin) {
			$localStorage.$reset();
			if(goToLogin) $state.go('login');
		};
		
		//PROTOTYPE
		this.isLoggedIn = function() {
			if(!_.isObject($localStorage.user)) return false;
			return true;
		};
		
		//helper functions mostly for easy access in views
		this.isManager = function() {
			if(!this.isLoggedIn()) return false;
			return $localStorage.user.type == "manager";
		};
		this.isEmployee = function() {
			if(!this.isLoggedIn()) return false;
			return $localStorage.user.type == "employee";
		};
    };


})();