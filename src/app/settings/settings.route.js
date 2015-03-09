angular.module( 'remote.settings.route',[ 'remote.settings.controller'] )

.config(function ($stateProvider, $urlRouterProvider) {


	$stateProvider
		.state('home.settings', {
			url: '/settings',
            views: {
                main: {
                    templateUrl: 'app/settings/settings.html',
                    controller: 'SettingsCtrl',
                    controllerAs: 'Settings'  
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