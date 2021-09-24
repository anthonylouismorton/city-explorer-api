const axios = require('axios')

class Forecast{
  constructor(date, description){
    this.date = date,
    this.description = description
  }
}

async function getWeather(request, response){
  let lat = request.query.lat
  let lon = request.query.lon
  const weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
  const weatherResponse = await axios.get(weatherBitURL)
  response.status(200).send(createweatherForecast(weatherResponse.data))
}
function createweatherForecast(searchedCity){
  const dailyForecast = searchedCity.data.map((day) => {
    const date = day.datetime;
    const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    return new Forecast(date,description)
  });
  return dailyForecast;
}
function createPoster(movieData){
  const movieDetails = movieData.data.results.map(movie => {
    return new Movie(movie);
  })
    return movieDetails;
};

async function getMovies(request, response) {
  const query = request.query.searchQuery;
  const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_DB_API_KEY}&query=${query}&page1`
  //const movieURL = `https://api.themoviedb.org/3/search/movie?api_key=db5eb7b4a487f5ccff2f78d3ccb7c8c0&query=Seattle&page1`
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

module.exports = {getWeather}