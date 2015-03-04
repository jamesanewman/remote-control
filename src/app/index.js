'use strict';

angular.module('remote', 
[
	'ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ui.router','mobile-angular-ui',
	
	'remote.discovery.route',
	'remote.easynews.route',
	'remote.favourites.route',
	'remote.remote.route',
	'remote.viewer.route',

	'remote.data.tvrage','remote.bookmark',
	'remote.utility.xml-query',
	'remote.series-service',
	'remote.xbmc-service',
	'remote.easynews-service'

])

.config(function ($stateProvider, $urlRouterProvider) {
	$stateProvider
	.state('home', {
		url: '/home',
		abstract: true,
		templateUrl: 'app/main/main.html',
		controller: 'MainCtrl',
		controllerAs: 'Main'
	})

	$urlRouterProvider.otherwise('/home/discovery');
})
;
