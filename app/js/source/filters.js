'use strict';

/* Filters */

angular.module('myApp.filters', []).
filter('sublist', function(){
	return function(input, range){
		return input.slice(0, range);
	};
});