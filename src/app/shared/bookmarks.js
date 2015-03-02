angular.module( 'remote.bookmark' , [] )

.service( 'BookmarkService' , ['$log' , 'SeriesBookmark' , function($log,SeriesBookmark){

	var debug = true,
		bookmarkIdentifier ="series-bookmarks",
		bookmarks = [];

	function __debugData(){
		return [
				{
					id: 24496,
					name: "Haven"
				}
			]
	}
	function _add( bookmark ){
		_.remove( bookmarks, { id: bookmark.id } );
		bookmarks.push( bookmark );
	}

	function _all(){
		_init();
		return localStorage.getItem( bookmarkIdentifier );
	}

	function _clear(){
		localStorage.removeItem( bookmarkIdentifier );
		_init();
	}

	function _init(){
		if( debug || !localStorage.hasItem( bookmarkIdentifier ) ){
			bookmarks = ( debug ) ? __debugData() : [];
			_save();
		}		
	}
	function _save(){
		var data = JSON.stringify( bookmarks );
		localStorage.setItem( bookmarkIdentifier , data );
	}

	this.create = function( values ){
		return new SeriesBookmark( values );
	}

	this.all = function(){ return _all(); };
	this.get = function(id){ return _.find( bookmarks , { id : id } ) };
	this.save = function( bookmark ){ _add( bookmark );	_save(); };
	this.update = function( bookmark ){ this.save( bookmark ); };
	this.clear = function(){ _clear(); };


}])