/**
 * Controller for Home page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .controller('AdminController', AdminController);

    AdminController.$inject = ["UserManager", "$scope", "$state", "SurveyManager", "$localStorage"];


    function AdminController(UserManager, $scope, $state, SurveyManager, $localStorage) {
		//TODO: "create manager" API
		//TODO: create company API
		//TODO: edit company API

        _construct();
    }


})();