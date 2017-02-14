const express = require('express');
const router = express.Router();
const weatherHelpers = require('../api/weather-helpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Skycast',
    user: req.user,
    lat: "undefined",
  });
});

router.get('/weather', weatherHelpers.fetchWeatherData, weatherHelpers.getDarkskyData, function(req, res, next) {
  res.render('index', {
    title: 'Skycast',
    user: req.user,
    city: res.locals.city,
    state: res.locals.state,
    weather: res.locals.weather
  })
})



module.exports = router;
