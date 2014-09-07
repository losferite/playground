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
