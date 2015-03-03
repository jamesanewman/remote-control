angular.module( 'remote.discovery.route',[ 'remote.discovery.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {

console.log("Discovery config ")
	$stateProvider
		.state('home.discovery', {
			url: '/discovery',
			views: {
				main: {
					templateUrl: 'app/discovery/discovery.html',
					controller: 'DiscoveryCtrl',
					controllerAs: 'Discovery'					

				},
				header: {
					templateUrl: 'app/discovery/header.html'
				}

			}
		});	
})

.run( function(){

})