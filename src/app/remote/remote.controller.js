angular.module( 'remote.remote.controller',[] )

.controller( 'RemoteCtrl', function($log,XBMCService){

    var Remote = this;

    Remote.left     = _.partial( XBMCService.input , 'left' );
    Remote.right    = _.partial( XBMCService.input , 'right' );
    Remote.up       = _.partial( XBMCService.input , 'up' );
    Remote.down     = _.partial( XBMCService.input , 'down' );
    Remote.select   = _.partial( XBMCService.input , 'select');
    Remote.back     = _.partial( XBMCService.input , 'back');
    Remote.info     = _.partial( XBMCService.input , 'info' );
    Remote.context  = _.partial( XBMCService.input , 'context' );

})