$(document).ready(function(){
	var apiBaseUrl = 'http://api.themoviedb.org/3/'
	var imageBaseUrl = 'http://image.tmdb.org/t/p/'
	const nowPlayingUrl = apiBaseUrl + 'movie/now_playing?api_key=' + apiKey 
	$.getJSON(nowPlayingUrl, function(nowPlayingData){
		var nowPlayingHTML = ''
		for(let i = 0; i<nowPlayingData.results.length; i++){
			var movieId = nowPlayingData.results[i].id
			var trailerUrl = apiBaseUrl + 'movie/' + movieId + '/videos?api_key=' + apiKey
			$.getJSON  (trailerUrl, function(targetMovieData){
				var detailUrl = apiBaseUrl + 'movie/' + targetMovieData.id + '?api_key=' + apiKey
				$.getJSON(detailUrl, function(detailData){
					var creditUrl = apiBaseUrl + 'movie/' + detailData.id + '/credits?api_key=' + apiKey
					$.getJSON(creditUrl, function(creditData){
						var releaseUrl = apiBaseUrl + 'movie/' + creditData.id + '/release_dates?api_key=' + apiKey	
						$.getJSON(releaseUrl, function(releaseData){
							var releaseDataArray = releaseData.results
							var mpaa = ""
							for(let i = 0; i<releaseData.results.length; i++){
								if(releaseData.results[i].iso_3166_1 === "US"){
									mpaa = releaseData.results[i].release_dates[0].certification
								}
							}
							var cast = creditData.cast[0].name + ", " + creditData.cast[1].name
							var genre = ""
							var crew = creditData.crew[0].name
							var job = creditData.crew[0].job 
							for(let i = 0; i<detailData.genres.length; i++){
								if(i>0){
								genre = genre + ", " + detailData.genres[i].name
								}else{genre = detailData.genres[i].name}
							}
							var homepage = detailData.homepage;
							var runtime = detailData.runtime			
							var movieKey = targetMovieData.results[0].key
							var youtubeLink = 'http://www.youtube.com/embed/' + movieKey
							var poster = imageBaseUrl + 'w300' + nowPlayingData.results[i].poster_path;
							if(i===0){nowPlayingHTML += '<div class="item active">'
							}else{nowPlayingHTML += '<div class="item">'};
							nowPlayingHTML += '<div class="each-movie">';
								nowPlayingHTML += '<div class="poster"><img src="' + poster + '"></div>';
								nowPlayingHTML += '<div class="right-box">';
									nowPlayingHTML += '<div class="title">' + nowPlayingData.results[i].title + ' (' + mpaa + ')</div>'
									nowPlayingHTML += '<div class="overview">Overview: ' + nowPlayingData.results[i].overview + '</div>'
									nowPlayingHTML += '<div class="release-date">Release Date: ' + nowPlayingData.results[i].release_date + '</div>'
									nowPlayingHTML += '<div class="vote-average">Rating: ' + nowPlayingData.results[i].vote_average + ' / 10</div>'
									nowPlayingHTML += '<div class="genre">Genre: ' + genre + '</div>'
									if(homepage.length>1){
										nowPlayingHTML += '<div class="homepage">Website: <a target="_blank" href="' + homepage + '">' + homepage + '</a></div>'}
									nowPlayingHTML += '<div class="runtime">Runtime: ' + runtime + ' minutes</div>'
									nowPlayingHTML += '<div class="cast">' + crew + ' (' + job + ') </div>'
									nowPlayingHTML += '<div class="cast">Cast: ' + cast + '</div>'
									// nowPlayingHTML += '<div class="preview">Watch Preview<a href="#" class="btn btn-default" data-toggle="modal" data-target="#videoModal" data-theVideo="' + youtubeLink + '">' + '<img src="youtube.png"></a></div>'
									nowPlayingHTML += '<div class="preview">Watch Preview<a target="_blank" href="'+ youtubeLink + '">' + '<img src="youtube.png"></a></div>'
								nowPlayingHTML += '</div>'	   	//right-box closing tag
							nowPlayingHTML += '</div>'			//each-movie closing tag	  youtubeLink
							nowPlayingHTML += '</div>'			//item closing tag
							$('.carousel-inner').html(nowPlayingHTML + carouselHTML);
						});
					});
				});
			})
		} //for loop ends
	});
	var searchMovieUrl = apiBaseUrl + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=';
	var searchInput = '';
	// $('.movie-form').submit(function(){
		$('.search-results').html('')
		event.preventDefault();
		searchInput = $('#movieSearch').val();
		searchInput = "harry potter"
		var fullSearch = searchMovieUrl + searchInput;
		$.getJSON(fullSearch, function(movieSearched){
			for(let i = 0; i < movieSearched.results.length; i++){
				var posterSearched = imageBaseUrl + 'w300' + movieSearched.results[i].poster_path;
            	if(movieSearched.results[i].poster_path.length>1){
            		$('.search-results').append('<img src="' + posterSearched + '">');
            	}
			}
		// })
	});
});


var carouselHTML = `<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    			<span class="sr-only">Previous</span></a>
  				<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    			<span class="sr-only">Next</span></a>`





