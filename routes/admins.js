var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const adminCtrl = require('../controllers/admins');

router.get('/admins/:id/login', isLoggedIn, adminCtrl.edit);
router.put('/admins/:id', isLoggedIn, adminCtrl.update);

module.exports = router;