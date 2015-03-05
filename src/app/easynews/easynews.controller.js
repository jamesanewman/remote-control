angular.module( 'remote.easynews.controller',[] )

.controller( 'EasynewsCtrl', function($log,$stateParams,EasynewsSearch,XBMCService){

    var EN = this,
        results;

    $log.debug("Easynews controller");
    EN.name = $stateParams.name;
    EN.season = $stateParams.season;
    EN.episode = $stateParams.episode;
    EN.title = $stateParams.title;
    EN.searchText = '';

    /**
     *
     * Check how easy news handles finding multi word ... searches
     * i.e.http://localhost:3000/#/home/easynews/Marvel's%20Agents%20of%20S.H.I.E.L.D./2/15
     * Marvel's%20Agents%20of%20S.H.I.E.L.D.
     * 
     */

    EN.search = function( searchText ){
        $log.debug("Searching for ", searchText );
        EasynewsSearch.search( {
            gps: searchText
        }).then( function( data ){
            $log.debug("Data -> " , angular.toJson(data,true) );

            if( data && data.matches.length > 0 ) {
                EN.info = data.info;
                EN.matches = data.matches;
            }
        });
    }

    EN.play = function( video ){

        var link = EasynewsSearch.buildDownload( video , EN.info );
        $log.debug("Play -> " , video , EN.info );
        $log.debug("Link -> " , link );
        XBMCService.sendToPlayer( link )
            .then( function( request ){
                console.log("XBMCResponse -> " , request );
            });

    }
    
    if( $stateParams.name !== undefined && $stateParams.name !== "" ){
        var searchText = [
                EN.name,
                "s" + ( "0" + EN.season).slice( -2 ),
                "e" + ( "0" + EN.episode).slice( -2 )
                ].join(" ");
        EN.searchText = searchText;
        EN.search( searchText );

    }

    $log.debug( "EN: " , $stateParams );
})