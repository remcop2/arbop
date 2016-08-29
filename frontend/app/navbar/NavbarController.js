/**
 * Controller for Home page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ["$scope", "User", "$state"];


    function NavbarController($scope, User, $state) {
        var self = this;
        ////////////  VARS
		$scope.User = User;
		
		

        ////////////  function definitions

    }


})();