;(function() {


    /**
     * Definition of the main app module and its dependencies
     */
    angular
        .module('arboplaats')
        .config(config);

    // prevents minification issues
    config.$inject = ['$stateProvider', '$locationProvider', '$httpProvider', '$compileProvider'];

    function config($stateProvider, $locationProvider, $httpProvider, $compileProvider) {

        $locationProvider.html5Mode(false);
		
		var defNavbarView = {
			templateUrl: "app/navbar/navbar.html",
			controller: "NavbarController"
		};


        //application's routes
        $stateProvider
            .state('index', {
                url: "",
                views: {
                    "NavbarView": defNavbarView,
                    "MainView": {
                        templateUrl: "app/login/login.html",
						controller: "LoginController"
                    }
                }
            })
            .state('login', {
                url: "/login",
                views: {
                    "NavbarView": defNavbarView,
                    "MainView": {
                        templateUrl: "app/login/login.html",
						controller: "LoginController"
                    }
                }
            })
			//TODO: rename state
			.state('answering', {
                url: "/survey",
                views: {
                    "NavbarView": defNavbarView,
                    "MainView": {
                        templateUrl: "app/answering/answering.html",
						controller: "AnsweringController"
                    }
                }
            })
			.state('manager', {
                url: "/manager",
                views: {
                    "NavbarView": defNavbarView,
                    "MainView": {
                        templateUrl: "app/manager/manager_portal.html",
						controller: "ManagerPortalController"
                    }
                }
            })
			.state('manager-employee', {
                url: "/manager/employee/:user_id",
                views: {
                    "NavbarView": defNavbarView,
                    "MainView": {
                        templateUrl: "app/manager/employee/employee.html",
						controller: "ManagerEmployeeController"
                    }
                }
            })
			.state('admin', {
                url: "/admin",
                views: {
                    "NavbarView": defNavbarView,
                    "MainView": {
                        templateUrl: "app/admin/admin.html",
						controller: "AdminController"
                    }
                }
            });

    }




})();