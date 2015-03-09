angular.module( 'remote.bookmark' , [] )

.factory( 'Storage' , [ '$log' , function($log){

	function Storage( name ){
		this.name = name;
	}

	Storage.prototype.get = function() {
		var data = localStorage.getItem( this.name );
		return JSON.parse( data );
	};

	Storage.prototype.set = function(data){
		data = angular.toJson( data );
		localStorage.setItem( this.name , data );
	}

	Storage.prototype.clear = function(){
		localStorage.removeItem( this.name );
	}

	return Storage;

}])

.service( 'BookmarkService' , ['$log' , 'Storage' , function( $log,Storage ){

	var bookmarkIdentifier ="series-bookmarks",
		storage = new Storage( bookmarkIdentifier ),
		bookmarks = [];

	function _add( bookmark ){
		// _.remove( bookmarks, { id: bookmark.id } );
		// bookmarks.push( bookmark );
		var data = storage.get();
		_.remove( data , { id: bookmark.id });
		data.push( bookmark );
		storage.set( data );
	}

	function _get( id ){

		var data = storage.get();
		return _.find( data , { id : id } );

	}

	function _all(){
		return storage.get();
	}

	function _clear(){ storage.clear(); }

	function _init(){
		var data = storage.get();
		if( data == undefined ) {
			data = [];
			storage.set( data );
		}
	}

	_init();

	this.all = _all;
	this.get = _get;
	this.clear = storage.clear;
	this.save = _add;


}])