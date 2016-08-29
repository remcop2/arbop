;(function() {


    /**
     * Definition of the main app module and its dependencies
     */
    angular
        .module('arboplaats', [
            'ui.router',
			'ngResource',
			'ngStorage',
			'arboplaats.api',
			'rzModule',
			'chart.js'
        ]);

    angular
        .module('arboplaats')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$rootScope', '$q', '$location'];

    function authInterceptor($rootScope, $q, $location) {

        return {

            // intercept every request
            request: function(config) {
                config.headers = config.headers || {};
                return config;
            },

            // Catch 404 errors
            responseError: function(response) {
                if (response.status === 404) {
                    $location.path('/');
                    return $q.reject(response);
                } else {
                    return $q.reject(response);
                }
            }
        };
    }


    angular
        .module('arboplaats')
        .run(run);

    run.$inject = ['$rootScope', '$state'];

    function run($rootScope, $state) {
		$rootScope.$state = $state;
        console.info("angular run()");
    }


})();