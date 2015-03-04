angular.module( 'remote.favourites.route',[ 'remote.favourites.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home.favourites', {
			url: '/favourites',
				
            views: {
                main: {
            templateUrl: 'app/favourites/favourites.html',
            controller: 'FavouritesCtrl',
            controllerAs: 'Favourites'                  },
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