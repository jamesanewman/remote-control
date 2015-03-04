angular.module( 'remote.easynews.route',[ 'remote.easynews.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home.easynews', {
			url: '/easynews/:name/:season/:episode?title',
					
            views: {
                main: {
                    templateUrl: 'app/easynews/easynews.html',
                    controller: 'EasynewsCtrl',
                    controllerAs: 'Easynews'
                },
                header: {
                    templateUrl: 'app/easynews/header.html'
                }

            }
        }); 

})

.run( function(){

})