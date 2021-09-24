const axios = require('axios')

function createPoster(movieData){
  const movieDetails = movieData.data.results.map(movie => {
    return new Movie(movie);
  })
    return movieDetails;
};

async function getMovies(request, response) {
  const query = request.query.searchQuery;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}&page1`
  const movieResponse = await axios.get(movieURL)

  response.status(200).send(createPoster(movieResponse))
}

class Movie{
  constructor(movie){
    this.title = movie.title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.total_votes = movie.vote_count;
    this.image_url = movie.poster_path;
    this.popularity = movie.popularity;
    this.released_on = movie.released_on;
  }
}

module.exports = {getMovies}