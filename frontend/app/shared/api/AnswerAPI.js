/**
 * Controller for Home page
 *
 */
(function() {
    angular
        .module('arboplaats.api')
        .factory('AnswerAPI', AnswerAPI);

    AnswerAPI.$inject = ["$resource", "CONSTANTS"];
	
    function AnswerAPI($resource, CONSTANTS) {
        var self = this;
        ////////////  VARS
		var API_URL = CONSTANTS.API_BASE;

        return $resource(API_URL,
			{
				
			},
			{
				create: {
					url: API_URL + "/employee/:user_id/answers",
					method: "POST",
					params: {
						user_id: "@user_id"
					}
				},
			
				byUser: {
					url: API_URL + "/employee/:user_id/answers",
					method: "GET",
					params: {
						user_id: "@user_id"
					}
				},
			
			}
	 	);
    }


})();