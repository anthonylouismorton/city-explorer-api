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


app.get('/weather', (request, response) => {
  //try{
  let city = request.query.searchQuery
  let lat = request.query.lat
  let lon = request.query.lon
  if(city){
    city = city.toLowerCase()
  }

  
  //}
  //   catch(error){
  //     response.send(400, `city not found`)
  // }
  const searchedCity = data.find(x => x.city_name.toLowerCase() === city && x.lat === lat && x.lon === lon);
  if(searchedCity === true){
    createweatherForecast(city)
  }

  response.send(userWeatherRequest)

  
});

class Forecast{
  constructor(date, description){
    this.date = date,
    this.description = description
  }
}
var Forecast = []

function createweatherForecast(city){
  const dailyForecast = city.data.map((day) => {
    const date = day.datetime;
    const description = `Low of ${day.low_temp}, high of ${day.high_temp} with ${day.weather.description}`;
    return new Forecast(date,description)
  });
  return dailyForecast;
}

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));

var Forecast2 = []

class Forecast2{
  constructor(date, description){
    this.date = date;
    this.description = description
  }
}


