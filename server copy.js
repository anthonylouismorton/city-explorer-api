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
  //try{
  let city = request.query.searchQuery
  let lat = request.query.lat
  let lon = request.query.lons

  response.send(createweatherForecast(searchedCity))

  
});


app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));



