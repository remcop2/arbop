/**
 * Controller for Home page
 *
 */
(function() {

    angular
        .module('arboplaats')
        .directive('defaultSlider', defaultSlider);



    function defaultSlider() { 
		var def = {
			restrict: 'E',
			templateUrl: 'app/answering/defaultSlider.directive.html',
			scope: {
				question: "="
			},
			link: function(scope, elem, attr, ctrl) {
				scope.slider = {
					options: {
						showTicks: true,
						showTicksValues: true,
						floor: 1,
						ceil: 10,
						getTickColor: function (value) {
							if (value < 3)
								return 'red';
							if (value < 6)
								return 'orange';
							if (value < 9)
								return 'yellow';
							return '#2AE02A';
						}
					}
				};
			}
		};
		
		return def;
    }


})();