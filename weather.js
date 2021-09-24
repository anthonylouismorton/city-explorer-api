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

module.exports = {getWeather}