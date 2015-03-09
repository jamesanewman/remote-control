angular.module( 'remote.xbmc-service' , [] )

.service( 'XBMCService', function( $log,$http,Storage ){
	//http://kodi.wiki/view/JSON-RPC_API/v6
	var XBMC = this,
		settings = (new Storage("settings")).get();
		url = 'http://' + settings.ip + '/',
		command = {id: 1, jsonrpc: "2.0" };


		//url = 'http://localhost:8200/'

	function cmd(){
		return _.cloneDeep( command );
	}

	function sendRequest( data ){
		$log.debug("Sending " , data , " to " , url + 'jsonrpc');
		return $http.post( url + 'jsonrpc' , data );
	}

	XBMC.sendText = function( text ){
		var data = cmd();
		data.params = {	method: "Player.SendText", item: {	text: text, done: true } };
		return sendRequest( data );
	}

	XBMC.input = function( what ){
		var data = cmd();

		switch( what ){
			case 'back':
				data.method = "Input.Back";
				break;
			case 'left':
				data.method = "Input.Left";
				break;
			case 'right':
				data.method = "Input.right";
				break;
			case 'up':
				data.method = "Input.Up";
				break;
			case 'down':
				data.method = "Input.Down";
				break;
			case 'select':
				data.method = "Input.Select";
				break;
			case 'info':
				data.method = "Input.Info";
				break;			
			case 'context':
				data.method = "Input.ContextMenu";
				break;
			}

		return sendRequest( data );
	}

	XBMC.sendToPlayer = function( link ){
		var data = cmd();
		data.params = {	method: "Player.Open", item: {	file: link } };
		return sendRequest( data );
	}
	
})