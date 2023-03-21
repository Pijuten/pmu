var express = require('express');
var router = express.Router();
var env = require('../bin/credentials')
var ExpressBrute = require('express-brute');

var store = new ExpressBrute.MemoryStore(); // stores state locally, don't use this in production
var bruteforce = new ExpressBrute(store);

/* GET users listing. */
router.get('/',function (req,res){
   res.render('login', { title: 'Login' });
});
router.post('/',bruteforce.prevent, function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    if(username===env.username&&password===env.password){
        req.session.loggedin=true;
        res.redirect('dashboard')
    }else{
        res.send('Failed Login');
    }
});

module.exports = router;
