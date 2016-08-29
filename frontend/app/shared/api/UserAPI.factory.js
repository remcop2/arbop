/**
 * Controller for Home page
 *
 */
(function() {
    angular
        .module('arboplaats.api')
        .factory('UserAPI', UserAPI);

    UserAPI.$inject = ["$resource", "CONSTANTS"];
	
    function UserAPI($resource, CONSTANTS) {
        var self = this;
        ////////////  VARS
		var API_URL = CONSTANTS.API_BASE;
		console.log(API_URL);

        return $resource(API_URL + "/user/:user_id",
			{
				
			},
			{
				login: {
					url: API_URL + "/user/login",
					method: "POST",
					params: {
						
					}
				},
				createManager: {
					url: API_URL + "/user/createManager",
					method: "POST",
					params: {
						
					}
				},
				getEmployees: {
					url: API_URL + "/manager/:manager_id/employees",
					method: "GET",
					params: {
						manager_id: "@manager_id"
					}
				},
				get: {
					url: API_URL + "/user/:user_id",
					method: "GET",
					params: {
						user_id: "@user_id"
					}
				}
			
			}
	 	);
    }


})();