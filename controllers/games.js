var Game = require('../models/game');

module.exports = {
    new: newGame,
    create,
    index,
    show,
    delete: gameDelete,
    edit,
    update,
    sort
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

function sort(req, res, ) {
    
    if (req.params.id === 'reviews'){
        Game.find({}, function(err, games) {
            games.sort(function(a, b){
                if (a.reviews.length < b.reviews.length) {
                    return 1;
                } else if (a.reviews.length > b.reviews.length) {
                    return -1;
                } else {
                    return 0;
                }
            });
            res.render('games', {title: 'All Games', games});
        });
    } 
    
    else if (req.params.id === 'average') {
        Game.find({}, function(err, games) {
            games.sort(function(a, b){
                if (calcAverReviews(a) < calcAverReviews(b)) {
                    return 1;
                } else if (calcAverReviews(a)> calcAverReviews(b)) {
                    return -1;
                } else {
                    return 0;
                }
            });
            res.render('games', {title: 'All Games', games});
        });
    } 
    
    else if (req.params.id === 'releaseYear'){
        Game.find({}).sort(`-${req.params.id}`).exec(function(err, games) {
            res.render('games', {title: 'All Games', games});
        });
    } 
    
    else {
        Game.find({}).sort(`${req.params.id}`).exec(function(err, games) {
            res.render('games', {title: 'All Games', games});
        });
    }

    function calcAverReviews(g){
         if (g.reviews.length) {  
            let total = 0
            g.reviews.forEach(function(r) { 
                total += r.rating
            });
            return total/g.reviews.length; 
        } else {
            return 0;
        }    
    }
}
