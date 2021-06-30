var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
var Game = require('../models/game');

/* GET home page. */
router.get('/', function(req, res, next) {
  Game.find({}, function(err, games){
  res.render('index', { title: 'Oandasan Games Review', games });
  });
});

router.get('/auth/google', passport.authenticate(
  'google', { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/',
    failureRedirect : '/'
  }
));

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
