var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const gamesCtrl = require('../controllers/games');

router.get('/', gamesCtrl.index);
router.get('/new', isLoggedIn, gamesCtrl.new);
router.get('/:id', gamesCtrl.show);
router.post('/', isLoggedIn, gamesCtrl.create);
router.delete('/:id', isLoggedIn, gamesCtrl.delete);
router.get('/:id/edit', isLoggedIn, gamesCtrl.edit);
router.put('/:id', isLoggedIn, gamesCtrl.update);

router.get('/sort/:id', gamesCtrl.sort);

module.exports = router;