var Game = require('../models/game');

module.exports = {
    new: newGame,
    create,
    index,
    show,
    delete: gameDelete,
    edit,
    update,
}

function index(req, res){
    Game.find({}, function(err, games) {
        res.render('games', {title: 'All Games', games});
    });
}

function newGame(req, res){
    res.render('games/new', { title: 'New Game' });
}

function create(req, res){
    req.body.user = req.user._id;
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const game = new Game(req.body);
    game.save(function(err){
        if (err) return console.log(err);
        res.redirect('/games');
    })
}

function show(req, res) {
    Game.findById(req.params.id, function(err, game) {        
        res.render('games/show', { title: 'Game Details', game });
    });   
}

function gameDelete(req, res) {
    Game.findOneAndDelete( {_id: req.params.id }, function(err){
        res.redirect('/games');
    })
}

function edit(req, res) {
    Game.findOne({_id: req.params.id}, function(err, game) {
        if (err || !game) return res.redirect('/games');
        res.render('games/edit', {title: 'Edit Game', game});
      });
}

function update(req, res) {
    Game.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, game) {
          if (err || !game) return res.redirect('/games');
          res.redirect('/games');
        }
      );
}