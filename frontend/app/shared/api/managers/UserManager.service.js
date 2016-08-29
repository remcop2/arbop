/**
 * Controller for Home page
 *
 */
;
(function() {
    angular
        .module('arboplaats.api')
        .service('UserManager', UserManager);

    UserManager.$inject = ["$resource", "$localStorage", "UserAPI", "User", "$q"];
	
    function UserManager($resource, $localStorage, UserAPI, User, $q) {
        var self = this;
		
        this.login = function(_email, _password) {
			var request = UserAPI.login({
				email: _email,
				password: _password,
			});
			
			request.$promise.then(function (response) {
				var defer = $q.defer()
				if(response.status == "success") {
					var data = response;
					
					var user = response.user;
					$localStorage.user = user;
					
					if(!_.isNull(user.employee_id)) {
						//user is employee
						User.setUserType("employee");
						data.user.type = "employee";
					} else {
						//user is manager
						User.setUserType("manager");
						data.user.type = "manager";
					}
					
					$localStorage.company = response.company;
					
					//pass through promise object
					defer.resolve(response);
				}
			});
			
			return request.$promise;
		}
			
		this.getEmployeesByManagerId = function(_manager_id) {
			var request = UserAPI.getEmployees({
				manager_id: _manager_id
			});

			request.$promise.then(function (response) {
				var defer = $q.defer()
				if(response.status == "success") {
					defer.resolve(response);
				}
			});

			return request.$promise;
		}
		
		this.getByUserId = function(_user_id) {
			var request = UserAPI.get({
				user_id: _user_id
			});

			request.$promise.then(function (response) {
				var defer = $q.defer()
				if(response.status == "success") {
					defer.resolve(response);
				}
			});

			return request.$promise;
		}
    }


})();