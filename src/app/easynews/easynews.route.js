angular.module( 'remote.easynews.route',[ 'remote.easynews.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home.easynews', {
			url: '/easynews',
			templateUrl: 'app/easynews/easynews.html',
			controller: 'EasynewsCtrl',
			controllerAs: 'Easynews'					
			});	
	
})

.run( function(){

})