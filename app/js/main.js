'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {templateUrl: 'partials/partial1.html', controller: 'MyCtrl1'});
  $routeProvider.when('/view2', {templateUrl: 'partials/partial2.html', controller: 'MyCtrl2'});
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('MyCtrl1', ['$scope', function($scope) {

}])
.controller('MyCtrl2', ['$scope', function($scope) {
	$scope.rows = [];
	var i = 0,
	getColumn = function (i, ii) {
		var d = getRandom(1, 9);
		return {
			name: 'col_' + i + '_' + ii + '_' + d,
			id: i + '' + ii + d,
			color: 'rgb(' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ', ' + getRandom(0, 255) + ')'
		}
	},
	getRandom = function (min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	while (i < 256) {
		var row = [], ii = 0;
		while (ii < 8) {
			row.push(getColumn(i, ii));
			ii++;
		}
		i++;
		$scope.rows.push(row);
	}
}]);

'use strict';

/* Directives */

angular.module('myApp.directives', []).
directive('grid', function(utils) {
	return {
		template: '\
			<div class="fixed-grid">\
				<div class="grid-row" ng-repeat="cols in rows | sublist:rowsCount">\
					<div class="grid-cell" ng-repeat="item in cols"><div grid-cell item="item"></div></div>\
				</div>\
			</div>',
		scope: {
			rows: '=rows',
			options: '=options',
		},
		replace: true,
		link: function(scope, elm, attrs) {
			var rowHeight = utils.getRowHeight();
			scope.rowsCount = Math.round(elm.innerHeight() / rowHeight) + 10;
			scope.scrollTop = 0;

			elm.on('scroll', function () {
				scope.scrollTop = elm.scrollTop();
				scope.$apply();
			});

			scope.$watch('scrollTop',function (n, o) {
				var i = (n - o) / rowHeight;
				i = (i > 0) ? Math.ceil(i) : Math.floor(i);
				scope.rowsCount += i;
			});
		}
	}
}).
directive('gridCell', function(utils) {
	return {
		template: '<div ng-click="setBg()">{{item.name}}</div>',
		scope: {
			item: '=item',
		},
		replace: true,
		link: function(scope, elm, attrs) {
			scope.setBg = function () {
				elm.css({'background-color': scope.item.color});
			}
		}
	}
});

'use strict';

/* Filters */

angular.module('myApp.filters', []).
filter('sublist', function(){
	return function(input, range){
		return input.slice(0, range);
	};
});
'use strict';

/* Services */

angular.module('myApp.services', []).
service('utils', function () {
	var func = {};

	func.getRowHeight = function () {
		return 32;
	}

	return func;
});
