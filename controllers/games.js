var Game = require('../models/game');

module.exports = {
    new: newGame,
    create,
    index,
    
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
    console.log(req.body);
    for (let key in req.body) {
        if (req.body[key] === '') delete req.body[key];
    }
    const game = new Game(req.body);
    game.save(function(err){
        res.redirect('/games');
        if (err) return;
    })
}