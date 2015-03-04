angular.module( 'remote.favourites.controller',[] )

.controller( 'FavouritesCtrl', function($log,BookmarkService,SeriesService){

    var FC = this,
        seriesData = BookmarkService.all(),
        favourites = _.map( seriesData , function(series){
            SeriesService.setSeries( series );
            var info = SeriesService.getSeriesInfo();
            info.lastEpisodes = SeriesService.getLastEpisode( 5 );
            return info;
        });

    FC.favourites = favourites;

    $log.debug("BM Service -> " , FC.favourites );


    FC.getLatest = function( idx ){
        $log.debug("Finding latest episode");
        SeriesService.setSeries( FC.favourites[ idx ] )
    }



})