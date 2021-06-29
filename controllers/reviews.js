var Game = require('../models/game');

module.exports = {
  create,
  delete: deleteReview,
  edit,
  update
};

function create(req, res) {
  // Find the movie to embed the review within
  Game.findById(req.params.id, function(err, game) {
    req.body.user = req.user._id;
    req.body.userName = req.user.name;
    req.body.userAvatar = req.user.avatar;
    // Push the subdoc for the review
    game.reviews.push(req.body);
    // Always save the top-level document (not subdocs)
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
      res.render('reviews/edit', {title: 'Edit Comment', game});
    }
  )
}

function update(req, res) {
  Game.findOne({'reviews._id': req.params.id}, function(err, game) {
    const reviewSubdoc = game.reviews.id(req.params.id);
    if (!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/games/${game._id}`);
    reviewSubdoc.text = req.body.text;
    game.save(function(err) {
      res.redirect(`/games/${game._id}`);
    });
  });
}