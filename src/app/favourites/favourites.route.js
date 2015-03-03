angular.module( 'remote.favourites.route',[ 'remote.favourites.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
		.state('home.favourites', {
			url: '/favourites',
			templateUrl: 'app/favourites/favourites.html',
			controller: 'FavouritesCtrl',
			controllerAs: 'Favourites'					
			});	

	
})

.run( function(){

})