angular.module( 'remote.favourites.controller',[] )

.controller( 'FavouritesCtrl', function($log,BookmarkService,SeriesService,TVData){

    var FC = this,
        summary = [],
        seriesData = BookmarkService.all(),
        favourites = [];

    _.forEach( seriesData , function(series){

        var seriesInfo = { id: series.id, name: series.name };
        favourites.push( seriesInfo );

        TVData.getSeries( series.id ).then( function( data ){

            SeriesService.setSeries( data );
            var info = SeriesService.getSeriesInfo();
            info.lastEpisodes = SeriesService.getLastEpisode( 5 );
            info.lastEpisode = SeriesService.getLastEpisode( 1 )[ 0 ];

            seriesInfo.series = info;


        });

    });

    FC.summary = summary;
    FC.favourites = favourites;

    $log.debug("BM Service -> " , FC.favourites );

    FC.remove = function( seriesId ){
        $log.debug( "Remove -> " , seriesId );
    }

    FC.toggleOpen = function( idx ){
        if( idx == FC.open ) {
            FC.open = undefined;
            return;
        }
        FC.open = idx;
    }

    FC.getLatest = function( idx ){
        $log.debug("Finding latest episode");
        SeriesService.setSeries( FC.favourites[ idx ] )
    }



})