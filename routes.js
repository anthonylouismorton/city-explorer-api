const axios = require('axios')


async function getMovies(req, res) {
  const {searchQuery} = req.query;

  const movieResponse = await axios.get(
    //`https://api.themoviedb.org/3/search/city?api_key=${env.process.MOVIE_DB_API_KEY}&query=${searchQuery}&page1`)
    `https://api.themoviedb.org/3/search/city?api_key=db5eb7b4a487f5ccff2f78d3ccb7c8c0&query=company&page1`)
  res.send(movieResponse.data.results)
}

module.exports = {getMovies}