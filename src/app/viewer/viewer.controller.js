angular.module( 'remote.viewer.controller',[] )

.controller( 'ViewerCtrl', function($log,$stateParams,TVData,$anchorScroll,$location,BookmarkService,$state){

	var VC = this;

	function loadSeries( id ){

		$log.debug( "View series -> " , id );
		$log.debug("--------------------------------");

		TVData.getSeries( id ).then( function( data ){
			$log.debug("Series data -> " , data );
			VC.series = data;
			VC.seasons = _.sortBy( _.keys( data.season ), function( value ){
				return -1 * value;
			});
			VC.seasonCount = VC.seasons.length;
			VC.currentOpen = _.first(VC.seasons);


		});

	}

	if( $stateParams.seriesid ) loadSeries( $stateParams.seriesid );

	VC.addToFavourites = function(){
		$log.debug("Adding to favourites...");
		BookmarkService.save( {
			id: VC.series.id,
			name: VC.series.name,
		} );
		$state.go( "home.favourites" );
	}

	VC.toggle = function( seasonNumber ){
		if( VC.currentOpen == seasonNumber ) VC.currentOpen = undefined;
		else {
			VC.currentOpen = seasonNumber;
		    var newHash = 'season_' + seasonNumber;
			if ($location.hash() !== newHash) {
	   		    $location.hash(newHash);
	      	} else {
		        $anchorScroll();
	        }

		}
	}
})