/**
 * Manager for answers and questions
 *
 */
;
(function() {
    angular
        .module('arboplaats.api')
        .service('SurveyManager', SurveyManager);

    SurveyManager.$inject = ["$resource", "AnswerAPI", "QuestionAPI", "$q"];
	
    function SurveyManager($resource, AnswerAPI, QuestionAPI, $q) {
        var self = this;
		
		this.questions = function(manager_id) {
			var request = QuestionAPI.getAll({manager_id: manager_id});
			
			request.$promise.then(function (response) {
				var defer = $q.defer();
				if(response.status == "success") {
					console.log(response.questions);	
				}
				defer.resolve(response);
			});
			
			return request.$promise;
		};
        
        this.answer = function(user_id, answers /* array of answers */) {
			var request = AnswerAPI.create({user_id: user_id, answers: answers});
			
			request.$promise.then(function (response) {
				var defer = $q.defer();
				if(response.status == "success") {
					
				}
				defer.resolve(response);
			});
			
			return request.$promise;
		};
		
		this.addQuestion = function(manager_id, question) {
			var request = QuestionAPI.create({manager_id: manager_id, question: question});
			
			request.$promise.then(function (response) {
				var defer = $q.defer();
				if(response.status == "success") {
					
				}
				defer.resolve(response);
			});
			
			return request.$promise;
		};
    }


})();