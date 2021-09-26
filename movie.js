const axios = require('axios')
const cache = require('./cache')

function createPoster(movieData){
  const movieDetails = movieData.data.results.map(movie => {
    return new Movie(movie);
  })
    return movieDetails;
}; 

async function getMovies(request, response) {
  const query = request.query.searchQuery;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}&page1`

  if(Date.now() - cache.movieCache[0] < 40000){
    console.log('cache works')
    response.status(200).send(cache.movieCache[1])
    return;
  }
  else{
  console.log('did not hit cache')
  const movieResponse = await axios.get(movieURL)
  cache.movieCache[0] = Date.now();
  cache.movieCache[1] = createPoster(movieResponse);
  response.status(200).send(createPoster(movieResponse))
  }
}

class Movie{
  constructor(movie){
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = "https://image.tmdb.org/t/p/w500"+movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
  }
}
module.exports={getMovies}