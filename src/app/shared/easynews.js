angular.module( "remote.easynews-service", [] )

.service( 'EasynewsSearch' , function($log,$http,Storage){

	var EN = this,
		fields = {
			'fly' 	: 2,
			'gps' 	: '',
			'other'	: "ARCHIVE",
			'safeO'	: 1,
			'sb'	: 1,
			'pno'	: 1,
			'chxu'	: 1,
			'pby' 	: 50,
			'u'		: 1,
			'chxqx'	: 1,
			'st'	: "basic",
			's1'	: "dtime",
			's1d'	: "-",
			'sS'	: 3,
			'vv'	: 1,
			'fty'	: "VIDEO"
		},
		resultFields = {
		    "2": "Extension",
		    "3": "Resolution",
		    "4": "Size",
		    "5": "Post Date",
		    "6": "Subject",
		    "7": "Poster",
		    "9": "Group",
		    "10": "Filename",
		    "12": "Video Codec",
		    "14": "Runtime",
		    "15": "BPS",
		    "16": "Sample Rate",
		    "17": "FPS",
		    "18": "Audio Codec",
		    "20": "Expire Date",
		    "FullThumb": "Full Thumb"
		},
		settings = (new Storage("settings")).get(),
		username = settings.username,
		password = settings.password,
		urlPrefix = "members.easynews.com/2.0/search/solr-search/?";

	function makeParams( params ){

		var paramString = '';
		_.forIn( params , function( value, field ){
			if( field==='fty' ) field += '[]';
			paramString += field + '=' + encodeURI( value ) + '&';
		});
		return paramString;
	}

	function extractData( data ){
		$log.debug("Data -> ", data.data)
		return data.data;
	}

	function parseData( data ){

		var o = {};

		o.info = _.pick( data , [ 'dlFarm','dlPort','baseURL','downURL','thumbURL']);

		o.matches = _.map( data.data, function( download ){
			var o2 = {};
			_.forIn( download , function( value,field ){
				var fn = resultFields[ field ] ? resultFields[ field ] : field;
				o2[ fn.toLowerCase() ] = value;
			})
			o2.thumb = "http://th.easynews.com/thumbnails-";
			o2.thumb += o2["0"].slice(0,3) + '/';
			o2.thumb += 'pr-' + o2["0"];
			o2.thumb += ".jpg";
			//41a/pr-41ae5fcb55d36207e436575047296d5d0bb317851.jpg
			return o2;
		})

		return o;

	}

	EN.search = function( opts ){

		var params = _.merge( _.cloneDeep( fields ) , opts ),
			paramString = makeParams( params ),
			url = [
				'http://',
				username,
				':',
				password,
				'@',
				urlPrefix,
				paramString
			].join('');

		$log.debug( url );

		return $http.get( url )
			.then( extractData )
			.then( parseData );

	}

	EN.buildDownload = function( download,info ){


		// dl/auto/80/e690496391475ef1e3c37c74897f25ac0e0a198e70241.avi/Haven%20S03E08.avi"

		$log.debug("Download -> " , download );
		var root = ['http://', username, ':', password, '@' ].join(''),
			url = info.downURL.replace('http://',root) + '/';

		url += [
			info.dlFarm,
			info.dlPort,
			download[ '0' ] + download.extension,
			download.filename + download.extension
		].join('/');
		// str += [
		// 	obj.downURL,
		// 	obj.dlFarm,
		// 	obj.dlPort,
		// 	obj["0"] + obj.Extension,
		// 	obj.Filename + obj.Extension
		// ].join("/");

		return url;
	}
});

	// var EasynewsSearch = (function() {
	// 	'use strict';

	// 	var fields = [
	// 		'fly', 'gps', 'other', 'safeO', 'sb', 'pno', 'chxu', 'pby',
	// 		'u', 'chxqx', 'st', 's1', 's1d', 'sS', 'vv', 'fty',
	// 	]



	// 	function joinParams( easynews ){

	// 		var params = "";

	// 		_.forEach( fields , function( field ){
	// 			var fieldname = field;

	// 			if( fieldname === "fty" ) fieldname += "[]"
	// 			if( easynews[ field ] ){

	// 				console.log("Field " , fieldname , " -> " , easynews[ field ]);
	// 				params += fieldname + "=" + encodeURI( easynews[ field ] ) + "&"

	// 			}
	// 		})

	// 		return params;

	// 	}

	// 	function EasynewsSearch( searchText ) {
	// 		// enforces new
	// 		if (!(this instanceof EasynewsSearch)) {
	// 			return new EasynewsSearch(args);
	// 		}
	// 		// constructor body
	// 		this.username = "jnewman";
	// 		this.pw = "amelia08";
	// 		this.searchPrefix = "members.easynews.com/2.0/search/solr-search/?";
	// 		this.fly = "2";
	// 		this.gps = ( searchText === undefined ) ? "" : searchText;
	// 		this.other = "ARCHIVE";
	// 		this.safeO = 1;
	// 		this.sb=1;
	// 		this.pno=1;
	// 		this.chxu=1;
	// 		this.pby=50;
	// 		this.u=1;
	// 		this.chxqx=1;
	// 		this.st="basic";
	// 		this.s1="dtime";
	// 		this.s1d="-";
	// 		this.sS=3;
	// 		this.vv=1;
	// 		this.fty="VIDEO";


	// 		// 	$http.get( 'http://jnewman:amelia08@members.easynews.com/2.0/search/solr-search/?fly=2&gps=haven%20s01%20e09&SelectOther=ARCHIVE&safeO=1&sb=1&pno=1&chxu=1&pby=50&u=1&chxgx=1&st=basic&s1=dtime&s1d=-&sS=3&vv=1&fty[]=VIDEO')
	// 		// 	$http.get( 'http://jnewman:amelia08@members.easynews.com/2.0/search/solr-search/?
	// 			//fly=2&
	// 			//gps=haven%20s01%20e09&
	// 			//SelectOther=ARCHIVE
	// 			//&safeO=1&sb=1&pno=1&chxu=1&pby=50&u=1&chxgx=1&st=basic&s1=dtime&s1d=-&sS=3&vv=1&fty[]=VIDEO')

	// 	}

	// 	//http://forum.kodi.tv/showthread.php?tid=208993&highlight=stream+link

	// 	EasynewsSearch.prototype.set = function( name,value ){
	// 		if( this[ name ] ){
	// 			this[name] = value;
	// 		}
	// 		return this;
	// 	}

	// 	EasynewsSearch.prototype.get = function( name ){
	// 		return this[ name ];
	// 	}

	// 	EasynewsSearch.prototype.search = function(args) {

	// 		var searchString = "";
	// 		searchString += "http://";
	// 		searchString += this.username;
	// 		searchString += ":" ;
	// 		searchString += this.pw;
	// 		searchString += "@";
	// 		searchString += this.searchPrefix;
	// 		searchString += joinParams( this );

	// 		// searchString += "";

	// 		console.log("Search url = " , searchString );

	// 		return $http.get( searchString );
	// 	};

	// 	return EasynewsSearch;

	// }());

	// return EasynewsSearch;
