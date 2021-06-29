var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const gamesCtrl = require('../controllers/games');

router.get('/', gamesCtrl.index);
router.get('/new', isLoggedIn, gamesCtrl.new);
router.get('/:id', gamesCtrl.show);
router.post('/', isLoggedIn, gamesCtrl.create);

module.exports = router;