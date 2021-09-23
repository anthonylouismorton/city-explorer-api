'use strict'
const dotenv = require('dotenv');
const { response } = require('express');
dotenv.config();

const express = require('express')
const data = require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT || 3001;
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

app.get('/weather', (request, response) => {
  let city = request.query.searchQuery
  let lat = request.query.lat
  let lon = request.query.lon
  if(city){
    city = city.toLowerCase()
  }
  try{
  const searchedCity = data.find(x => x.city_name.toLowerCase() === city && x.lat === lat && x.lon === lon);
 
  
  response.send(createweatherForecast(searchedCity))
  }
  catch(error){
    errorHandler();
  }
  function errorHandler(error,text){
    error = 500;
    text ="City not found. Try another city"
    response.status(error).send(text)
  }
  
});
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



