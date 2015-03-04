angular.module( 'remote.easynews.controller',[] )

.controller( 'EasynewsCtrl', function($log,$stateParams){

    var EN = this;

    $log.debug("Easynews controller");
    EN.name = $stateParams.name;
    EN.season = $stateParams.season;
    EN.episode = $stateParams.episode;

    /**
     *
     * Check how easy news handles finding multi word ... searches
     * i.e.http://localhost:3000/#/home/easynews/Marvel's%20Agents%20of%20S.H.I.E.L.D./2/15
     * Marvel's%20Agents%20of%20S.H.I.E.L.D.
     * 
     */


    $log.debug( "EN: " , $stateParams );
})