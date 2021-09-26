const axios = require('axios')
const cache = require('./cache')
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

  if(Date.now() - cache.weatherCache[0] < 50000){
    console.log('cache works')
    response.send(cache.weatherCache[1])
    return;
  }
  else{
  console.log('did not hit cache')
  const weatherResponse = await axios.get(weatherBitURL)
  cache.weatherCache[0] = Date.now();
  cache.weatherCache[1] = createweatherForecast(weatherResponse.data)
  response.status(200).send(createweatherForecast(weatherResponse.data))
  
  }
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