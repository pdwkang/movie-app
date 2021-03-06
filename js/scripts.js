$(document).ready(function(){
	var apiBaseUrl = 'http://api.themoviedb.org/3/'
	var imageBaseUrl = 'http://image.tmdb.org/t/p/'
	const nowPlayingUrl = apiBaseUrl + 'movie/now_playing?api_key=' + apiKey 
	//---------------------------------------------------------//
	//------------ Currently playing movie carousel  -----------//
	//---------------------------------------------------------//	
	$.getJSON(nowPlayingUrl, function(nowPlayingData){
		var nowPlayingHTML = ''
		var nowPlayingChartHTML = ''
		//------------------------------------------------//
		//------------ loop through each movie -----------//
		//------------------------------------------------//
		for(let i = 0; i<nowPlayingData.results.length; i++){
			var movieId = nowPlayingData.results[i].id
			var trailerUrl = apiBaseUrl + 'movie/' + movieId + '/videos?api_key=' + apiKey
			//---------------------------------------------------------//
			//------------ Currently playing movie carousel -----------//
			//---------------------------------------------------------//				
			$.getJSON  (trailerUrl, function(targetMovieData){
				var detailUrl = apiBaseUrl + 'movie/' + targetMovieData.id + '?api_key=' + apiKey
				$.getJSON(detailUrl, function(detailData){
					//-------------------------------------------------------//
					//------------ Reached Max API REQUESTS of 40 -----------//
					//------- below is commented due to call back hell ------//
					//-------------------------------------------------------//
					// var creditUrl = apiBaseUrl + 'movie/' + detailData.id + '/credits?api_key=' + apiKey
					// $.getJSON(creditUrl, function(creditData){
					// 	var releaseUrl = apiBaseUrl + 'movie/' + creditData.id + '/release_dates?api_key=' + apiKey	
					// 	$.getJSON(releaseUrl, function(releaseData){
					// 		var releaseDataArray = releaseData.results
					// 		var mpaa = ""
					// 		for(let i = 0; i<releaseData.results.length; i++){
					// 			if(releaseData.results[i].iso_3166_1 === "US"){
					// 				mpaa = releaseData.results[i].release_dates[0].certification
					// 			}
					// 		}
					// 		var cast = creditData.cast[0].name + ", " + creditData.cast[1].name
					// 		var crew = creditData.crew[0].name
					// 		var job = creditData.crew[0].job 
					var genre = ""
					for(let i = 0; i<detailData.genres.length; i++){
						if(i>0){
							if(i<4){
							genre = genre + ", " + detailData.genres[i].name}
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
							nowPlayingHTML += '<div class="title">' + nowPlayingData.results[i].title + '</div>'
							// if(mpaa.length>0){
							// 	nowPlayingHTML += ' <span class="mpaa">(' + mpaa + ')</span></div>'
							// }else{nowPlayingHTML += '</div>'}
							nowPlayingHTML += '<div class="overview">' + nowPlayingData.results[i].overview + '</div>'
							nowPlayingHTML += '<div class="vote-average">Rating: ' + nowPlayingData.results[i].vote_average + ' / 10 <img src="images/rating.png"></div>'
							nowPlayingHTML += '<div class="genre">Genre: ' + genre + '</div>'
							nowPlayingHTML += '<div class="runtime">Runtime: ' + runtime + ' minutes</div>'
							// nowPlayingHTML += '<div class="cast">Cast: ' + cast + '</div>'
							// nowPlayingHTML += '<div class="cast">Director / Producer: ' + crew + '</div>'
							nowPlayingHTML += '<div class="release-date">Release Date: ' + nowPlayingData.results[i].release_date + '</div>'									
							if(homepage.length>1){
								nowPlayingHTML += '<div class="homepage">Website: <a target="_blank" href="' + homepage + '">' + homepage + '</a></div>'}									
							nowPlayingHTML += '<div class="preview">Preview: <a target="_blank" href="'+ youtubeLink + '">' + youtubeLink + '</a></div>'
						nowPlayingHTML += '</div>'	   	//right-box closing tag
						nowPlayingHTML += '</div>'			//each-movie closing tag	  youtubeLink
						nowPlayingHTML += '</div>'			//item closing tag
						$('.carousel-inner').html(nowPlayingHTML + carouselHTML);
					if(i<10){
						if(nowPlayingData.results[i].title.length>27){
							nowPlayingChartHTML += '<div class="nowPlayingChart">' + nowPlayingData.results[i].title.slice(0,27) +'... &nbsp<span class="nowPlayingRating"><img src="images/thumbsUp.png"> ' + nowPlayingData.results[i].vote_average*10 + '%</span></div>'
						}else{nowPlayingChartHTML += '<div class="nowPlayingChart">' + nowPlayingData.results[i].title + '&nbsp<span class="nowPlayingRating"><img src="images/thumbsUp.png"> ' + nowPlayingData.results[i].vote_average*10 + '%</span></div>'
						};
						$('.topNowShowing').html(nowPlayingTitle + nowPlayingChartHTML);
					}
				});
				// 	});
				// });
			})
		} //-------------------------------------------------------//
		  //-------------------- for loop ends --------------------//
		  //-------------------------------------------------------//
	});
	var searchMovieUrl = apiBaseUrl + 'search/movie?api_key=' + apiKey + '&language=en-US&page=1&include_adult=false&query=';
	var searchInput = 'lord of the rings';
	searchMovie();
	$('.movie-form').submit(function(){
		$('.search-results').html('')
		event.preventDefault();
		searchInput = $('#movieSearch').val();		
		searchMovie();
	});

	function searchMovie(){
		var fullSearch = searchMovieUrl + searchInput;
		$.getJSON(fullSearch, function(movieSearched){
			for(let i = 0; i < movieSearched.results.length; i++){
				var posterSearched = imageBaseUrl + 'w300' + movieSearched.results[i].poster_path;
				var searchMovieTitle = movieSearched.results[i].title;
				var searchMovieRating = Math.floor(movieSearched.results[i].vote_average)
				// var searchMoviePopularity = Math.floor(movieSearched.results[i].popularity*10)
				var searchMovieReleaseDate = movieSearched.results[i].release_date;
				var searchMovieOverview = movieSearched.results[i].overview;
				var searchMovieHTML = ''
	            if((movieSearched.results[i].poster_path)&&(searchMovieRating>0)){
	           		searchMovieHTML += '<div class="eachSearchMovie"><button type="button" class="btn invisible-btn" data-toggle="modal" data-target="#exampleModal' + i + '" data-whatever="@' + i + '"><img src="' + posterSearched + '"></button>'
	           			searchMovieHTML += '<div class="modal fade" id="exampleModal' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><div class="modal-dialog" role="document"><div class="modal-content">'
		           			searchMovieHTML += '<div class="searchMovieTitle">' + searchMovieTitle + '</div>'
		           			searchMovieHTML += '<br><img src="' + posterSearched + '">'
	    	       		if(searchMovieRating>6.9){
	    	       			searchMovieHTML += '<div class="searchMovieRating green">' + searchMovieRating + '/10 Critics Rating</div>'
	    	       		}else{searchMovieHTML += '<div class="searchMovieRating red">' + searchMovieRating + '/10 Critics Rating</div>'
	    	       		}
	        	   			searchMovieHTML += '<div class="searchMovieReleaseDate">Release Date: ' + searchMovieReleaseDate + '</div>'
	           				searchMovieHTML += '<div class="searchMovieOverview">' + searchMovieOverview + '</div>'
	           		searchMovieHTML += '</div><br></div>'
	           		searchMovieHTML += '</div></div></div>'		
	           		$('.search-results').append(searchMovieHTML);
	          	}
			}
		})
	};	//searchMovie function ends

	function getTvShows(){
		const tvShowUrl = apiBaseUrl + 'tv/top_rated?api_key=' + apiKey 
		var tvShowHTML = ''
	    $.getJSON(tvShowUrl, function(tvData){
			for(let i = 0; i < tvData.results.length; i++){
					tvShowHTML += '<div class="eachTvShow"><button type="button" class="btn invisible-btn" data-toggle="modal" data-target="#exampleModalTV' + i + '" data-whatever="@' + i + '"><img src="' + imageBaseUrl + 'w300' + tvData.results[i].poster_path + '"></button>'
	           		tvShowHTML += '<div class="modal fade" id="exampleModalTV' + i + '" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"><div class="modal-dialog" role="document"><div class="modal-content">'
					// tvShowHTML += '<img src="' + imageBaseUrl + 'w300' + tvData.results[i].poster_path + '"><br>'
					tvShowHTML += '<span class="tvTitle">' + tvData.results[i].name + '</span><br><br>'
					tvShowHTML +=  '<img src="' + imageBaseUrl + 'w300' + tvData.results[i].poster_path + '">'
					tvShowHTML += '<span class="tvAirDate">First Episode: ' + tvData.results[i].first_air_date + '</span><br>'
					tvShowHTML += '<span class="tvDescription">' + tvData.results[i].overview + '</span>'
					tvShowHTML += '</div></div></div></div>'
				$('.tv-wrapper').html(tvShowHTML)
			}
		});
	}
	getTvShows();
});

//-------------------------------------------------------//
//----------- Carousel static HTML bootstrap ------------//
//-------------------------------------------------------//
var carouselHTML = `<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    			<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    			<span class="sr-only">Previous</span></a>
  				<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    			<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    			<span class="sr-only">Next</span></a>`
var nowPlayingTitle = '<div class="nowPlayingTitle">Top Movies In Theaters Now!</div>'



//-------------------------------------------//
//-------------- Weather Widget -------------//
//-------------------------------------------//
var weatherLocation = "30033"
$(document).ready(function(){
	getWeather();
    $('#weather-form').submit(function(){
        event.preventDefault();
        weatherLocation = $('#location').val();
        getWeather();
    });
});

function getWeather(){    
    var weatherUrl = "http://api.openweathermap.org/data/2.5/weather?units=imperial&zip=" +weatherLocation+ ",us&appid=" + apiKey3;
    $.getJSON(weatherUrl, function(weatherData){
    	var currTemp = weatherData.main.temp;
		var weatherName = weatherData.name;
		var weatherIcon = weatherData.weather[0].icon +'.png';
		var weatherDescription = weatherData.weather[0].description
		$('#currTemp').html(weatherName)
		$('.weather-description').html("<img src='http://openweathermap.org/img/w/" + weatherIcon + "'>" + weatherDescription )
		var canvas = $('#weather-canvas');
        var context = canvas[0].getContext('2d');
        var currPercent = 0;
        function animate(current){
            context.fillStyle = "#21b4e2";
            context.beginPath();
            context.arc(85,75,45,Math.PI*0,Math.PI*2);
            context.closePath();
            context.fill();
			$('.degrees').html(Math.floor(currPercent/2.5) + "&deg;")
			context.strokeStyle = 'white'
          	$('.degrees').css({'color':'white'})
			//--------------------------------------------------//
			//----------- Color by temperature, math -----------//
			//--------------------------------------------------//
            // if(currPercent<150){
          		// context.strokeStyle = '#e8eaf6'
          	// 	$('.degrees').css({'color':'#e8eaf6'})
          	// }else if(currPercent<100){
          	// 	context.strokeStyle = '#e3f2fd'
          	// 	$('.degrees').css({'color':'#e3f2fd'})
          	// }else if(currPercent<150){
            //  	context.strokeStyle = '#bbdefb'
            //    	$('.degrees').css({'color':'#bbdefb'})
            //  }else if(currPercent<200){
          	// 	context.strokeStyle = '#bbdefb'
          	// 	$('.degrees').css({'color':'#bbdefb'})
          	// }else if(currPercent<250){
          	// 	context.strokeStyle = '#64b5f6'
          	// 	$('.degrees').css({'color':'#64b5f6'})
          	// }else if(currPercent<300){
          	// 	context.strokeStyle = '#64b5f6'	
          	// 	$('.degrees').css({'color':'#64b5f6'})
          	// }else if(currPercent<350){
          	// 	context.strokeStyle = '#64b5f6'
          	// 	$('.degrees').css({'color':'#64b5f6'})
          	// }else if(currPercent<400){
          	// 	context.strokeStyle = '#5c6bc0'
          	// 	$('.degrees').css({'color':'#5c6bc0'})
          	// }else if(currPercent<450){
          	// 	context.strokeStyle = '#42a5f5'
          	// 	$('.degrees').css({'color':'#42a5f5'})
          	// }else if(currPercent<500){
          	// 	context.strokeStyle = '#3f51b5'
          	// 	$('.degrees').css({'color':'#3f51b5'})
          	// }else if(currPercent>=500){
          	// 	context.strokeStyle = '#2196f3'
          	// 	$('.degrees').css({'color':'#2196f3'})
          	// }
            context.lineWidth = 3; 
            context.beginPath();
            context.arc(85,75,43,Math.PI*1.5, (Math.PI * 2 * current) + Math.PI*1.5);
            context.stroke()	
            currPercent++;
   			var currPercent2 = currPercent / 2.5
            if(currPercent2<currTemp){
            	requestAnimationFrame(function(){
            		animate(currPercent / 250)
            	})
            }
        }
        animate();
	    var weatherWeekUrl = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=' + weatherLocation + ',us&mode=json&units=imperial&appid=' + apiKey3;
    	$.getJSON(weatherWeekUrl, function(weatherWeekData){
    		var weekHTML = ""
    		for(let i=0; i<7; i++){
	    		var weatherDate = new Date(weatherWeekData.list[i].dt * 1000)
				var date = weatherDate.getDate()
   		     	var numOfTheweek = weatherDate.getDay()
   	    	 	var dayOfTheweek = ""
         		if(numOfTheweek===0){
					dayOfTheweek="SUN"
           		}else if(numOfTheweek===1){
					dayOfTheweek="MON"
				}else if(numOfTheweek===2){
					dayOfTheweek="TUE"
        	   	}else if(numOfTheweek===3){
        	   		dayOfTheweek="WED"
       		 	}else if(numOfTheweek===4){
       		   		dayOfTheweek="THR"
      		 	}else if(numOfTheweek===5){
       		   		dayOfTheweek="FRI"
        	  	}else if(numOfTheweek===6){
					dayOfTheweek="SAT"
           		};
       			var max = weatherWeekData.list[i].temp.max
       			var min = weatherWeekData.list[i].temp.min
       			weekHTML += "<div>" + dayOfTheweek + "<br><span class='tempHigh'>" + Math.floor(max) + "</span><br><span class='tempLow'>" + Math.floor(min) + "</span></div>"
       		}
			$('.weather-week').html(weekHTML);
		// $('.weather-week').prepend('<div>Day<br>Date<br>High<br>Low</div>')
    	})

		//--------------------------------------------------//
		//----------- Get Show Times / Fandango ------------//
		//--------------------------------------------------//
    	var currentDate = new Date()
		var dd = currentDate.getDate();
		var mm = currentDate.getMonth()+1;
		var yyyy = currentDate.getFullYear();
		var currentMovieDate = yyyy + '-' + mm + '-' + dd
		var showtimeUrl = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=' + currentMovieDate + '&zip=' + weatherLocation + '&imageSize=Md&api_key=' + apiKey2
		$.getJSON(showtimeUrl, function(showTimeData){
			var showTimeHTML = ''
			var theaterHTML = '<div class="theaterName">' + showTimeData[0].showtimes[0].theatre.name + '&nbsp &nbsp &nbsp<img src="images/fandango.png"></div>'
			for(let i=0; i<15; i++){
				showTimeHTML += '<div class="showTimeWrapper">'
				showTimeHTML += '<div class="individualShowTimes">' + showTimeData[i].title + '</div>'
				showTimeHTML += '<div class="bookFandango"><a href="' + showTimeData[i].showtimes[0].ticketURI + '">Get Tickets!</a></div>'
				showTimeHTML += '</div><br>'	
			}
			$('.showTimes').html(theaterHTML + showTimeHTML);
		});
	});
}



//-------------------------------------//
//----------- Movie Stocks ------------//
//-------------------------------------//
$(document).ready(function(){
	symbol = 'nflx'
		// nflx fox via
	$('.fox').click(function(){
		symbol = 'foxa'
	})
	$('.nflx').click(function(){
		symbol = 'nflx'
	})
	$('.via').click(function(){
		symbol = 'via'
	})


	//----------------------------------------//
	//----------- Stock Ajax call ------------//
	//----------------------------------------//		
	function runJSON1(){
		var url = `http://query.yahooapis.com/v1/public/yql?
		q=select%20*%20from%20yahoo.finance.quotes%20where%20symbol%20in%20
		("${symbol}")%0A%09%09&env=http%3A%2F%2Fdatatables.org%2Falltables.env&format=json`;
		$.getJSON(url, function(stockData){
			var stockInfo = stockData.query.results.quote;
			if(stockData.query.count == 1){
				var htmlToPlot = buildStockRow(stockInfo);
				$('#stock-body').html(htmlToPlot);				
			}else{
				$('#stock-body').html("");
				for(let i = 0; i < stockInfo.length; i++){
					var htmlToPlot = buildStockRow(stockInfo[i]);
					$('#stock-body').append(htmlToPlot);
				}
			}
		});	
	}
	setInterval(runJSON1, 1000);


	//--------------------------------------//
	//----------- data onto dom ------------//
	//--------------------------------------//	
	function buildStockRow(stock){
		if(stock.Change.indexOf('+') > -1) {
			var classChange = "success";
		}
		else{
			var classChange = "danger";
		}

		var date = new Date()
		var timeStamp;
		if(date.getHours() < 10){
			timeStamp = "0" + date.getHours();
		}else{
			timeStamp = date.getHours();
		};

		if(date.getMinutes() < 10){
			timeStamp += (":0" + date.getMinutes())
		}else{
			timeStamp += (":" + date.getMinutes())	
		};

		if(date.getSeconds() < 10){
			timeStamp += (":0" + date.getSeconds())
		}else{
			timeStamp += (":" + date.getSeconds())	
		};
		var newHTML = '';
		newHTML += '<tr>';
			newHTML += '<td>'+(stock.Symbol).toUpperCase() +'</td>';
			newHTML += '<td>'+stock.Name+'</td>';
			newHTML += '<td>'+stock.Ask+'</td>';
			newHTML += '<td>'+stock.Bid+'</td>';
			newHTML += '<td class="'+classChange+'">'+stock.Change+'</td>';
			newHTML += '<td>'+timeStamp+'</td>';
		newHTML += '</tr>';
		return newHTML;
	}	
});


