angular.module( 'remote.data.tvrage' , [] )

.service( 'TVData', function( $log,$http,XQ ){

	var Data = this,
		searchUrl = "http://thetvdb.com/api/GetSeries.php?seriesname=",
		bannerUrl = 'http://thetvdb.com/banners/',
		seriesMap = {
			'banner' : 'banner', 
			'seriesid' : 'id',
			'SeriesName': 'name',
			'FirstAired': 'aired',
			'Overview': 'description'
		},
		seriesFields = _.keys( seriesMap );

	function extractData( data ){
		return data.data;
	}

	function makeDom( xmlData ){
		var parser = new DOMParser();
		return parser.parseFromString(xmlData, "text/xml").documentElement;
	}

	function buildSeries( dom ){

		var seriesList = [];

		$log.debug( "Model input -> " , dom );
		$log.debug( "Model series -> " , XQ.find( dom,'Series' ) );
		
		_.forEach( XQ.find( dom, 'Series') , function( series ){

			var seriesData = {};
 
			_.forEach( XQ.getChildren( series ), function( field ){
				var name = XQ.getName( field ),
					value = XQ.getText( field );

				if( _.includes( seriesFields, name ) )	seriesData[ seriesMap[name] ] = value;
				$log.debug( XQ.getName( field ) , " -> " , XQ.getText( field ));

			})

			seriesList.push( seriesData );

		})

		return seriesList;
	}

	function resolveUrls ( series ){

		_.forEach( series , function( seriesData ){

			if( seriesData.banner ) seriesData.banner = bannerUrl + seriesData.banner;
			if( seriesData.fanart ) seriesData.fanart = bannerUrl + seriesData.fanart;
			if( seriesData.poster ) seriesData.poster = bannerUrl + seriesData.poster;
		
		});
		return series;

	}

	Data.search = function( searchText ){

		var url = searchUrl + searchText;
		return $http.get( url )
			.then( extractData )
			.then( makeDom )
			.then( buildSeries )
			.then( resolveUrls );

	}


	// this.search = function( name ) {
	// 	// http://thetvdb.com/api/E7E2CC6FC09A1B78/
	// 	//var url = "http://localhost:8000/GetSeries.php?seriesname="+name;
	// 	var url = "http://thetvdb.com/api/GetSeries.php?seriesname="+name;
	// 	// would throw CORS unless on mobile
	// 	return $http.get( url ) //, req )
	// 		.then( _flatten )
	// 		.then( _parseSearch )
	// 		.then( _report );
	// }




})