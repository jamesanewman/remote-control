angular.module( 'remote.remote.route',[ 'remote.remote.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {


	$stateProvider
		.state('home.remote', {
			url: '/remote',
            views: {
                main: {
                    templateUrl: 'app/remote/remote.html',
                    controller: 'RemoteCtrl',
                    controllerAs: 'Remote'  
                    },
                header: {
                    templateUrl: 'app/favourites/header.html',
                    // controller: 'ViewerCtrl',
                    // controllerAs: 'Viewer'                   
                }

            }
		});	

	
})

.run( function(){

})