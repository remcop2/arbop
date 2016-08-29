/**
 * Controller for employee's results page
 *
 */
(function() {
    angular
        .module('arboplaats.api')
        .service('ResultsManager', ResultsManager);

    ResultsManager.$inject = ["$resource", "AnswerAPI", "QuestionAPI", "$q"];
	
    function ResultsManager($resource, AnswerAPI, QuestionAPI, $q) {
        var self = this;
        
		//get answers for user
        this.byUser = function(user_id) {
			var request = AnswerAPI.byUser({user_id: user_id});
			
			request.$promise.then(function (response) {
				var defer = $q.defer()
				if(response.status == "success") {
					
				}
				defer.resolve(response);
			});
			
			return request.$promise;
		};
    }


})();