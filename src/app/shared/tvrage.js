angular.module( 'remote.data.tvrage' , [] )

.service( 'TVData', function( $log,$http,XQ ){

	var Data = this,
		searchUrl = "http://thetvdb.com/api/GetSeries.php?seriesname=",
		bannerUrl = 'http://thetvdb.com/banners/',
		seriesMap = {
			'banner' : 'banner', 
			'fanart' : 'fanart',
			'seriesid' : 'id',
			'SeriesName': 'name',
			'FirstAired': 'aired',
			'Overview': 'description'
		},
		episodeMap = {
			'id' : 'id',
			'EpisodeName' : 'name',
			'EpisodeNumber' : 'number',
			'FirstAired' : 'aired',
			'Overview' : 'description',
			"filename" : 'artwork',
			'SeasonNumber' : 'season',
			'lastupdated' : 'lastupdated',
			'seasonid' : 'seasonid',
			'seriesid' : 'seriesid'
		},
		seriesFields = _.keys( seriesMap ),
		episodeFields = _.keys( episodeMap );

	function extractData( data ){
		return data.data;
	}

	function makeDom( xmlData ){
		var parser = new DOMParser();
		return parser.parseFromString(xmlData, "text/xml").documentElement;
	}

	function extractSeriesData( seriesElement ){

		var seriesData = {};

		_.forEach( XQ.getChildren( seriesElement ), function( field ){
			var name = XQ.getName( field ),
				value = XQ.getText( field );

			if( _.includes( seriesFields, name ) )	seriesData[ seriesMap[name] ] = value;
			$log.debug( XQ.getName( field ) , " -> " , XQ.getText( field ));

		})

		return seriesData;
	}

	function extractEpisodeData( episodeElement ){
		var episodeData = {};

		_.forEach( XQ.getChildren( episodeElement ), function( field ){
			var name = XQ.getName( field ),
				value = XQ.getText( field );

			if( _.includes( episodeFields, name ) )	episodeData[ episodeMap[name] ] = value;
			$log.debug( XQ.getName( field ) , " -> " , XQ.getText( field ));

		})

		return episodeData;		
	}

	function buildSeries( dom ){

		var seriesList = [];

		$log.debug( "Model input -> " , dom );
		$log.debug( "Model series -> " , XQ.find( dom,'Series' ) );
		
		_.forEach( XQ.find( dom, 'Series') , function( series ){

			var seriesData = extractSeriesData( series );
 			seriesList.push( seriesData );

		})

		return seriesList;
	}

	function buildFull( dom ){

		var series = XQ.find( dom , 'Series' )[ 0 ],
			episodeList = XQ.find( dom, 'Episode' );

		series = extractSeriesData( series );
		series.season = {};

		_.map( episodeList , function( episode ){

			var data = extractEpisodeData( episode );

			if( series.season[ data.season ] === undefined ){
				series.season[ data.season ] = [];
			}

			series.season[ data.season ].push( data );

			$log.debug("Data -> " , data );

		});

		$log.debug("Series full data -> " , series );
		return series;
	}

	function resolveUrls ( series ){

		_.forEach( series , function( seriesData ){

			if( seriesData.banner ) seriesData.banner = bannerUrl + seriesData.banner;
			if( seriesData.fanart ) seriesData.fanart = bannerUrl + seriesData.fanart;
			if( seriesData.poster ) seriesData.poster = bannerUrl + seriesData.poster;
		
		});
		return series;

	}

	function resolveEpisodeUrls ( series ){


		if( series.banner ) series.banner = bannerUrl + series.banner;
		if( series.fanart ) series.fanart = bannerUrl + series.fanart;
		if( series.poster ) series.poster = bannerUrl + series.poster;

		_.forEach( series.season , function( seasonData ){

			_.forEach( seasonData, function( episode ){

				if( episode.artwork ) episode.artwork = bannerUrl + episode.artwork;

			})
		
		});
		return series;

	}

	function buildBase( httpPromise ){

		return httpPromise
			.then( extractData )
			.then( makeDom )

	}

	Data.search = function( searchText ){

		var url = searchUrl + searchText;
		return buildBase( $http.get( url ) )
			.then( buildSeries )
			.then( resolveUrls );

	}

	Data.getSeries = function( id ){
		var url = "http://thetvdb.com/api/E7E2CC6FC09A1B78/series/" + id + "/all/en.xml";

		return buildBase( $http.get( url ) )
			.then( buildFull )
			.then( resolveEpisodeUrls )
	}


})