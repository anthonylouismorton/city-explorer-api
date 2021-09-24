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

const weatherHandler = require('./weather.js')
const movieHandler = require('./movie.js')

app.get('/weather', weatherHandler.getWeather);
app.get('/movies', movieHandler.getMovies);

app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


