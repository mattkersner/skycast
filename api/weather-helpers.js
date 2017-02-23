const models = require('../db/models/index');
const axios = require('axios');
const moment = require('moment');
require('dotenv').config();

let getGeoData = (req, res, next) => {
  axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${process.env.GEO_KEY}`)
  .then((response) => {
    res.locals.lat = response.data.location.lat;
    res.locals.lon = response.data.location.lng;
    return next();
  }).catch((err) => {
    console.log(err);
  })
}

let fetchWeatherDataWithLat = (req, res, next) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${res.locals.lat},${res.locals.lon}&key=${process.env.GEO_KEY}`)
  .then((response) => {
    console.log(response.data.results[0].formatted_address);
    res.locals.address = response.data.results[0].formatted_address;
    return next();
  }).catch((err) => {
    console.log(err);
  })
}

let fetchWeatherDataWithAddress = (req, res, next) => {
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${res.locals.address}&key=${process.env.GEO_KEY}`)
    .then((response) => {
      res.locals.city = response.data.results[0].address_components[1].long_name;
      res.locals.state = response.data.results[0].address_components[3].short_name;
      res.locals.lat = response.data.results[0].geometry.location.lat;
      res.locals.lon = response.data.results[0].geometry.location.lng;
      return next();
    }).catch((err) => {
      console.error(err);
      return next();
    });
}

let fetchWeatherDataWithZip = (req, res, next) => {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GEO_KEY}`)
    .then((response) => {
      res.locals.city = response.data.results[0].address_components[1].long_name;
      res.locals.state = response.data.results[0].address_components[3].short_name;
      res.locals.lat = response.data.results[0].geometry.location.lat;
      res.locals.lon = response.data.results[0].geometry.location.lng;
      return next();
    })
    .catch((err) => {
      console.error(err);
    });
  }

let getDarkskyData = (req, res, next) => {
  axios.get(`https://api.darksky.net/forecast/${process.env.DARK_KEY}/${res.locals.lat},${res.locals.lon}`)
  .then((response) => {
    console.log(response.data.daily.data);
    res.locals.weather = response.data
    res.locals.daily = response.data.daily.data;
    let dailyDays = [];
    for (let i = 0; i < 7; i++) {
      dailyDays.push(moment.unix(response.data.daily.data[i].time).format('dddd'));
    }
    res.locals.dailyDays = dailyDays;
    res.locals.weeklySummary = response.data.daily.summary;
    res.locals.hourly = response.data.hourly.data;
    return next();
  })
}

  module.exports = {
    fetchWeatherDataWithZip,
    getDarkskyData,
    getGeoData,
    fetchWeatherDataWithLat,
    fetchWeatherDataWithAddress
  }
