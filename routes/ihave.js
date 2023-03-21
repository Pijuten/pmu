var express = require('express');
var router = express.Router();
var multer = require('multer')
const {pool} = require("../bin/db/postgres");

const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        let date = new Date();
        cb(null,  date.getDate() + date.getTime() + "." + file.originalname.split(".").pop());
    },
});

const diskStorage = multer({ storage: storage });

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.query('Select * from Entry Where approved=true and have=false order by id DESC', (error, results) => {
        if (error) {
            res.render('error');
        }else
            try {
                res.render('habe',  {loggedIn: true, json: results['rows']})
            }catch (fehler){

                res.render('error');
            }
    })

});

router.post('/', diskStorage.single("image"),function (req,res){
    try {
        if(!req.body.usname||!req.body.kontakt||!req.body.titel){
            res.render("/error");
        }else {
            let usname = req.body.usname;
            let kontakt = req.body.kontakt;
            let titel = req.body.titel;
            let beschreibung=null;
            let file = null;
            let filename = null;
            if(req.file) {filename = req.file.filename;}
            if(req.body.beschreibung) {beschreibung = req.body.beschreibung;}
            console.log(filename)
            pool.query('INSERT INTO Entry (name, title, kontakt, beschreibung, image, approved, have) values ($1,$2,$3,$4,$5,false,true)', [usname, titel, kontakt, beschreibung, filename], (error, results) => {
                if (error) {
                    console.log(error)
                    res.redirect("/error");
                } else {
                    res.redirect('/');
                }
            })
        }
    }catch (e){
        console.log(e);
        res.redirect('/error')
    }
})

module.exports = router;
