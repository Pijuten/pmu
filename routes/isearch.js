var express = require('express');
var router = express.Router();
const {pool} = require("../bin/db/postgres");


/* GET home page. */
router.get('/', function (req, res, next) {
    pool.query('Select * from Entry Where approved=true and have=true order by id DESC', (error, results) => {
        if (error) {
            res.render('error');
        } else
            try {
                res.render('suche', {loggedIn: true, json: results['rows']})
            } catch (fehler) {

                res.render('error');
            }
    })
});

router.post('/', function (req, res) {
    try {
        console.log(req.body)
        if (!req.body.usname || !req.body.kontakt || !req.body.titel) {
            res.render("/error");
        } else {
            let usname = req.body.usname;
            let kontakt = req.body.kontakt;
            let titel = req.body.titel;
            let beschreibung = req.body.beschreibung;
            console.log(usname)
            pool.query('INSERT INTO Entry (name, title, kontakt, beschreibung, approved, have) values ($1,$2,$3,$4,false,false)', [usname, titel, kontakt, beschreibung], (error, results) => {
                if (error) {
                    console.log(error)
                    res.redirect("/error");
                } else {
                    res.redirect('/');
                }
            })
        }

    } catch (e) {
        console.log(e)
        res.redirect('error')
    }
})

module.exports = router;
