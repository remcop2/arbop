/**
 * Controller for Home page
 *
 */
(function() {
    angular
        .module('arboplaats.api')
        .factory('CompanyFactory', CompanyFactory);

    CompanyFactory.$inject = ["$resource", "CONSTANTS"];
	
    function CompanyFactory($resource, CONSTANTS) {
        var self = this;
        ////////////  VARS
		var API_URL = CONSTANTS.API_BASE;
		console.log(API_URL);

        return $resource(API_URL + "/company",
			{
				
			},
			{
				create: {
					url: API_URL + "/create",
					method: "POST",
					params: {
						
					}
				}
			
			}
	 	);
    }


})();