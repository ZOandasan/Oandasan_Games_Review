var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const reviewsCtrl = require('../controllers/reviews');

router.post('/games/:id/reviews', isLoggedIn, reviewsCtrl.create);

module.exports = router;