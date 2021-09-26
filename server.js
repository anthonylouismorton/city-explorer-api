'use strict'
const dotenv = require('dotenv').config();
const express = require('express')
//const data = require('./data/weather.json')
const cors = require('cors');
const PORT = process.env.PORT || 3005;
const app = express();
app.use(cors());

const weatherHandler = require('./weather')
const movieHandler = require('./movie.js')

app.get('/weather', weatherHandler.getWeather);
app.get('/movies', movieHandler.getMovies);
app.get('/');

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


