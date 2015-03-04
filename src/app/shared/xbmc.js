angular.module( 'remote.xbmc-service' , [] )

.service( 'XBMCService', function( $log,$http ){

	var XBMC = this,
		command = {
			open: { id: 1, jsonrpc: "2.0", method: "Player.Open" }
		};

	XBMC.sendToPlayer = function( link ){


		var data = _.cloneDeep( command.open );

		data.params = {
			item: {
				file: link
			}
		}

		var request = $http.post( 'http://192.168.1.125/jsonrpc' , data );
		return request;

	}
	
})