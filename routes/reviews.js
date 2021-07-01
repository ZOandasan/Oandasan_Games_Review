var express = require('express');
var router = express.Router();
const passport = require('passport');
const isLoggedIn = require('../config/auth');
const reviewsCtrl = require('../controllers/reviews');

router.get('/reviews/:id/edit', isLoggedIn, reviewsCtrl.edit);
router.post('/games/:id/reviews', isLoggedIn, reviewsCtrl.create);
router.put('/reviews/:id', isLoggedIn, reviewsCtrl.update);
router.delete('/reviews/:id', isLoggedIn, reviewsCtrl.delete);

router.get('/reviews/:id/admins/edit', isLoggedIn, reviewsCtrl.editVis)
router.put('/reviews/:id/admins', isLoggedIn, reviewsCtrl.updateVis);



module.exports = router;