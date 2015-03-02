'use strict';

angular.module('remote', 
[
	'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router','mobile-angular-ui',
	'remote.data.tvrage','remote.bookmark',
	'remote.utility.xml-query'
])

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	  .state('home', {
	    url: '/',
	    templateUrl: 'app/main/main.html',
	    controller: 'MainCtrl',
	    controllerAs: 'search'
	  });

	$urlRouterProvider.otherwise('/');
})
;
