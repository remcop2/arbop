/**
 * Controller for Home page
 *
 */
;
(function() {
    angular
        .module('arboplaats.api')
        .factory('QuestionAPI', QuestionAPI);

    QuestionAPI.$inject = ["$resource", "CONSTANTS"];
	
    function QuestionAPI($resource, CONSTANTS) {
        var self = this;
        ////////////  VARS
		var API_URL = CONSTANTS.API_BASE;

        return $resource(API_URL + "",
			{
				
			},
			{
				getAll: {
					url: API_URL + "/manager/:manager_id/questions",
					method: "GET",
					params: {
						
					}
				},
				create: {
					url: API_URL + "/manager/:manager_id/questions",
					method: "POST",
					params: {
						manager_id: "@manager_id"
					}
				}
			}
						 
	 	);
    };


})();