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


        function _removeNotAired( episode ){
            if( episode.aired == undefined || episode.aired == "" ) return false;
            var episodeDate = episode.aired.split('-'),
                today = new Date(),
                year = parseInt( episodeDate[ 0 ] ),
                month = parseInt( episodeDate[ 1 ] ),
                day = parseInt( episodeDate[ 2 ] )

            //$log.debug("Episode air date = " , episodeDate );

            if( year > today.getFullYear() ) return false;
            if( year == today.getFullYear() ){
                //$log.debug("Check month " , month , " : " , today.getMonth()+1)
                if( month > today.getMonth()+1 ) return false;
                if( month == today.getMonth()+1 ){
                    if( day > today.getDate() ) return false;
                }
            }

            return true;
        }

        // Store in reverse order
        episodes = _.sortBy( _.flattenDeep( seasons ) , function( episode ){
            var sortIdx = 100000 - Number( (episode.season * 10) + episode.number );
            var today = new Date();
            return sortIdx;
        });
        
        episodes = _.filter( episodes , _removeNotAired );
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