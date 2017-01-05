function Poster(props){
	
	return(
		<div className="col-sm-6 col-md-4 col-lg-3">
			<img src={props.poster} />
		</div>
	)
}

// ES5 way, takes an objects
var Movies = React.createClass({
	getInitialState: function(){
		return{
			moviesToShow: []
		}	
	},
	componentDidMount: function(){
		// var self = this;
		var url = 'http://api.themoviedb.org/3/movie/now_playing?api_key=711598378e9580af473078fd4c1c1a26'
		$.getJSON(url, function(movieData){
			console.log(this)
			var nowPlayingArray =[];
			for(let i = 0; i < movieData.results.length; i++){
				nowPlayingArray.push(movieData.results[i]);
			};
			this.setState({
				moviesToShow: nowPlayingArray
			});
		}.bind(this));		
	},
	render: function(){
		var imagePath = "http://image.tmdb.org/t/p/w300"
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-12 text-center">
						<div className="th-wrapper">
							<button className="btn btn-primary">Reset Search</button>
						</div>
						<div className="movie-rows">
							{this.state.moviesToShow.map(function(movie, index){
								var fullImagePath = imagePath + movie.poster_path
								return <Poster key={index} poster={fullImagePath} />
							})}
						</div>
					</div>
				</div>
			</div>			
		)
	}
})

ReactDOM.render(
	<Movies />,
	document.getElementById('movie-gallery')
)