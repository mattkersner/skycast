const express = require('express');
const router = express.Router();
const moment = require('moment');
const models = require('../db/models/index');
const weatherHelpers = require('../api/weather-helpers');
const authHelpers = require('../auth/auth-helpers');
const favoriteHelpers = require('../favorites/favorite-helpers');

/* GET home page. */
router.get('/',
  weatherHelpers.getGeoData,
  weatherHelpers.fetchWeatherDataWithLat,
  weatherHelpers.fetchWeatherDataWithAddress,
  weatherHelpers.getDarkskyData,
  function(req, res, next) {
    res.render('index', {
      title: 'Skycast',
      user: req.user,
      city: res.locals.city,
      state: res.locals.state,
      weather: res.locals.weather,
      daily: res.locals.daily,
      dailyDays: res.locals.dailyDays,
      hourly: res.locals.hourly,
      summary: res.locals.weeklySummary
    });
});

router.get('/weather',
  weatherHelpers.fetchWeatherDataWithZip,
  weatherHelpers.getDarkskyData,
  function(req, res, next) {
    res.render('index', {
      title: 'Skycast',
      user: req.user,
      city: res.locals.city,
      state: res.locals.state,
      weather: res.locals.weather,
      summary: res.locals.weeklySummary
    })
})

router.post('/favorites', authHelpers.loginRequired, function (req, res, next) {
  console.log("city =============>" + req.body.city);
    models.Favorites.create({
    user_id: req.user.id,
    address: req.body.city,
  }).then(function() {
    res.redirect('/user');
   }).catch((err) => {
    console.log(err);
   })
});



module.exports = router;
