var express = require('express');
var router = express.Router();
const {pool} = require("../bin/db/postgres");
const {stringify} = require("nodemon/lib/utils");


router.get('/delete/:postid',function (req,res){
    if(req.session.loggedin===true){
        console.log(req.params);
        let postid= req.params.postid;
        pool.query('DELETE FROM Entry WHERE id=$1',[postid], (error, results) => {
            if(error){
                console.log(error)
                res.redirect("/error");
            }else{
                res.redirect('/dashboard');
            }
        })
    }else {
        res.render("error");
    }
});

router.get('/accept/:postid',function (req,res){
    if(req.session.loggedin===true){
        console.log(req.params);
        let postid= req.params.postid;
        pool.query('UPDATE Entry SET approved=true WHERE id=$1 ',[postid], (error, results) => {
            if(error){
                console.log(error)
                res.redirect("/error");
            }else{
                res.redirect('/dashboard');
            }
        })
    }else {
        res.render("error");
    }
});

router.get('/:postid',function (req,res){

        let postid= req.params.postid;
        pool.query('SELECT * from entry WHERE id=$1 and approved=true',[postid], (error, results) => {
            if(error){
                console.log(error)
                res.redirect("/error");
            }else{
                res.render('post', { json: results['rows']})
            }
        })

});

module.exports = router;