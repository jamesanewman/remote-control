angular.module( 'remote.remote.route',[ 'remote.remote.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {


	$stateProvider
		.state('home.remote', {
			url: '/remote',
			templateUrl: 'app/remote/remote.html',
			controller: 'RemoteCtrl',
			controllerAs: 'Remote'					
			});	

	
})

.run( function(){

})