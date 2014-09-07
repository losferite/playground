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
