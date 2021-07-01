var User = require('../models/user');

module.exports = {
    edit,
    update,
}

function edit (req, res){
    User.findOne({_id: req.params.id }, function(err, user){
        if (err || !user) return res.redirect('/');
        res.render(`admins/login`, { title: 'Admin Portal', user ,});
    });
}

function update (req, res){
    let passwordAttempts = req.user.adminAttempts;
    if (req.body.password === process.env.SECRET && passwordAttempts < 5){
        User.findByIdAndUpdate({_id: req.params.id }, { admin:true, adminAttempts:++passwordAttempts }, { new:true }, function(err, user){
            res.redirect('/');
        });
    } else {
        User.findByIdAndUpdate({_id: req.params.id }, { adminAttempts:++passwordAttempts }, { new:true }, function(err, user){
            res.redirect('/');
        });
    }
}