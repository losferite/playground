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
