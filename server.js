'use strict'
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();
const express = require('express')
//const data = require('./data/weather.json')
const cors = require('cors');
const axios = require(axios)
const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors());


app.get('/', (request, response) => {
  response.status(200).send('I am home at last!')
});
class Forecast{
  constructor(date, description){
    this.date = date,
    this.description = description
  }
}
axios.get('/weather', getWeather);

async function getWeather(request, response){
  let lat = request.query.lat
  console.log(lat)
  let lon = request.query.lon
  console.log(lon)
  const weatherBitURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
  console.log(process.env.WEATHER_API_KEY)
  //const weatherBitURL = `https://api.weatherbit.io/v2.0/current?lat=48.8588897&lon=2.3200410217200766&key=523922934e614c008ea95cbc65e4b3a8`
  console.log(weatherBitURL)
  const weatherResponse = await axios.get(weatherBitURL)
  console.log(weatherResponse)
  response.status(200).send(createweatherForecast(weatherResponse))
}
// app.get('/weather', (request, response) => {
//   let city = request.query.searchQuery
//   let lat = request.query.lat
//   let lon = request.query.lon
//   if(city){
//     city = city.toLowerCase()
//   }
//   try{
//   const searchedCity = data.find(x => x.city_name.toLowerCase() === city && x.lat === lat && x.lon === lon);
 
  
//   response.send(createweatherForecast(searchedCity))
//   }
//   catch(error){
//     errorHandler();
//   }
//   function errorHandler(error,text){
//     error = 500;
//     text ="City not found. Try another city"
//     response.status(error).send(text)
//   }
  
// });
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



