const models = require('../db/models/index');
const axios = require('axios');
require('dotenv').config();

let getGeoData = (req, res, next) => {
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GEO_KEY}`)
  .then((response) => {
    console.log(response.data);
    return next();
  })
}

let fetchWeatherData = (req, res, next) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GEO_KEY}`)
    .then((response) => {
      res.locals.city = response.data.results[0].address_components[1].long_name;
      res.locals.state = response.data.results[0].address_components[3].short_name;
      res.locals.lat = response.data.results[0].geometry.location.lat;
      res.locals.lon = response.data.results[0].geometry.location.lng;
      return next();
    })
    .catch((err) => { console.error(err); });
  }

let getDarkskyData = (req, res, next) => {
  axios.get(`https://api.darksky.net/forecast/${process.env.DARK_KEY}/${res.locals.lat},${res.locals.lon}`)
  .then((response) => {
    console.log(response.data);
    res.locals.weather = response.data
    return next();
  })
}

  module.exports = {
    fetchWeatherData,
    getDarkskyData,
    getGeoData
  }
