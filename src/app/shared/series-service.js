angular.module( 'remote.series-service' , [] )

.service( 'SeriesService' , function( $log ){

    /*
    Provide convience features around series data
     */

    var SS = this,
        series,
        seasons,
        episodes;

    SS.setSeries = function( seriesData ){

        series = seriesData;

        seasons = []
        _.forIn( seriesData.season, function( v,k ){
            seasons.push( v );    
        });

        // Store in reverse order
        episodes = _.sortBy( _.flattenDeep( seasons ) , function( episode ){
            var sortIdx = 100000 - Number( (episode.season * 10) + episode.number );
            $log.debug("Sort episode " , episode.season, ":" , episode.number , " -> " , sortIdx);
            return sortIdx;
        });
        
        $log.debug("Episodes -> " , episodes)
    }


    SS.getLastEpisode = function(n){
        if( n == undefined ) n = 1;
        return _.take( episodes , n )
    }

    SS.getSeriesInfo = function(){
        var seriesdata = _.cloneDeep( series );
        seriesdata.season = undefined;
        return seriesdata;
    }

})