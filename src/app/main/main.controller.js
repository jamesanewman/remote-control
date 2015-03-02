'use strict';

angular.module('remote')
.controller( 'MainCtrl', function( $scope,SharedState ){

})

.controller('DiscoveryCtrl', function ($scope,$log,TVData) {

  var DC = this;

  DC.searchText = "buffy";
  DC.search = function(){

  	$log.debug("DC / looking -> " , DC.searchText );

    TVData.search( DC.searchText ).then( function( series ){

      $log.debug("DC / New Series -> " , series);
      DC.matches = series;

    });

  }

  DC.view = function( series ){
  	$log.debug( "View series -> " , series );
  }

  $log.debug("DC / Data -> ", TVData );

  if( 1 ) {
  	DC.search();
  }

});
