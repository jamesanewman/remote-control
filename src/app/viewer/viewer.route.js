angular.module( 'remote.viewer.route',[ 'remote.viewer.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {


	$stateProvider
		.state('home.viewer', {
			url: '/viewer/:seriesid',
			views: {
				main: {
					templateUrl: 'app/viewer/viewer.html',
					controller: 'ViewerCtrl',
					controllerAs: 'Viewer'					
				},
				header: {
					templateUrl: 'app/viewer/header.html',
					// controller: 'ViewerCtrl',
					// controllerAs: 'Viewer'					
				}

			}
		});	

	
})

.run( function(){

})