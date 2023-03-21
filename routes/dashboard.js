var express = require('express');
var router = express.Router();
const {pool} = require("../bin/db/postgres");



/* GET home page. */
router.get('/', function(req, res) {
    let dataRes;
    if (req.session.loggedin) {
        pool.query('Select * from Entry Where approved=false order by id DESC', (error, results) => {
            if (error) {
                res.render('error');
            }else
            try {
                res.render('dashboard', {loggedIn: true, json: results['rows']})
            }catch (fehler){

                res.render('error');
            }
        })

    } else {
        res.render('dashboard', {loggedIn: false})
    }
});

module.exports = router;
