var Game = require('../models/game');

module.exports = {
  create,
  delete: deleteReview,
  edit,
  update
};

function create(req, res) {
  Game.findById(req.params.id, function(err, game) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    game.reviews.push(req.body);
    game.save(function(err) {
      res.redirect(`/games/${game._id}`);
    });
  });
}

function deleteReview(req, res) {
  Game.findOne(
    {'reviews._id': req.params.id, 'reviews.user': req.user._id},
    function(err, game) {
      if (!game || err) return res.redirect(`/games/${game._id}`);
      game.reviews.remove(req.params.id);
      game.save(function(err) {
        res.redirect(`/games/${game._id}`);
      });
    }
  );
}

function edit(req, res){
  Game.findOne(
    {'reviews._id': req.params.id, 'reviews.user': req.user._id},
    function(err, game){
      if (!game || err) return res.redirect(`/games/${game._id}`);
      console.log(game);
      res.render('reviews/edit', {title: 'Edit Comment', game});
    }
  )
}

function update(req, res) {
  console.log('Inside of Update');
  Game.findOne({'reviews._id': req.params.id}, function(err, game) {
    console.log('Inside of Find One');

    const reviewSubdoc = game.reviews.id(req.params.id);
    if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/games/${game._id}`);
    reviewSubdoc.text = req.body.text;
    game.save(function(err) {
      res.redirect(`/games/${game._id}`);
    });
  });
}