angular.module( 'remote.directive.episode' , [] )

.directive( 'showEpisode', function( $log ){

	$log.debug("Show Episode starting...")


	return {
		restrict : 'E',
		transclude: true,
		templateUrl: 'components/episode/episode.html',
		scope: {
			episode: '='
		},
		link: function( scope,element,attrs ) {
			$log.debug("Episode -> " , scope.episode );
		}
	}

})