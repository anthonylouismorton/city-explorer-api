'use strict'
const dotenv = require('dotenv').config();
const { response } = require('express');
const express = require('express')
const data = require('./data/weather.json')
const cors = require('cors');
const axios = require('axios')
const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors());
const handlerfunctions = require('./routes.js')

app.get('/', (request, response) => {
  response.status(200).send('I am home at last!')
});
class Forecast{
  constructor(date, description){
    this.date = date,
    this.description = description
  }
}

//app.get('/movies', handlerfunctions.getMovies)
app.get('/weather', getWeather);

console.log(getWeather)

async function getWeather(request, response){
  let lat = request.query.lat
  let lon = request.query.lon
  const weatherBitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
  const weatherResponse = await axios.get(weatherBitURL)
  response.status(200).send(createweatherForecast(weatherResponse.data))
}
// async function getWeather(request, response){
//   let city = request.query.searchQuery
//   let lat = request.query.lat
//   let lon = request.query.lon
//   if(city){
//     city = city.toLowerCase()
//   }
//   try{
//   const weatherBitURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
//   const weatherResponse = await axios.get(weatherBitURL)
//   const searchedCity = weatherRespnse.data.find(x => x.city_name.toLowerCase() === city && x.lat === lat && x.lon === lon);
 
  
//   response.send(createweatherForecast(searchedCity))
//   }
//   catch(error){
//     errorHandler();
//   }
//   function errorHandler(error,text){
//     error = "500";
//     text ="City not found."
//     response.send(error,text)
//   }
  
// };
function createweatherForecast(searchedCity){
  const dailyForecast = searchedCity.data.map((day) => {
    const date = day.datetime;
    const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    return new Forecast(date,description)
  });
  return dailyForecast;
}
//var Forecast = []

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



