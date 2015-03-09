angular.module( 'remote.settings.controller',[] )

.controller( 'SettingsCtrl', function($log,Storage){

    var SC = this,
        settings = new Storage( "settings" );

    SC.settings = settings.get();
    
    SC.save = function(){ settings.set( SC.settings ); }


})