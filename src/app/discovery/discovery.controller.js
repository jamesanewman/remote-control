angular.module( 'remote.discovery.controller',[] )

.controller( 'DiscoveryCtrl', function($log,TVData,$state,Storage){

	$log.debug("Discovery controller -> ")

	var DC = this;

	var search = new Storage( "search" ),
		settings = search.get();

	if( settings == null ) settings = { lastSearch: "" };

	$log.debug("Settings -> " , settings )
	DC.searchText = settings.lastSearch;

	DC.search = function(){

		search.set( { lastSearch: DC.searchText } );
		$log.debug("DC / looking -> " , DC.searchText );

		TVData.search( DC.searchText ).then( function( series ){

			$log.debug("DC / New Series -> " , series );
			DC.matches = series;

		});

	}

	DC.view = function( seriesId ){

		$state.go( 'home.viewer' , { seriesid: seriesId })

		// $log.debug( "View series -> " , seriesId );
		// $log.debug("--------------------------------");

		// TVData.getSeries( seriesId ).then( function( data ){

		// 	$log.debug("Series data -> " , data );

		// })
	}

	DC.checkKey = function( $event ){
		if( $event.keyCode == 13 ){
			DC.search();
		}
	}
	
	$log.debug("DC / Data -> ", TVData );

	if( 1 ) {
		DC.search();
	}


})