var express = require('express');
var router = express.Router();
const {pool} = require("../bin/db/postgres");

/* GET home page. */
router.get('/', function(req, res, next) {

  pool.query('Select * from Entry Where approved=true and have=true order by id DESC', (error, results) => {
    if (error) {
      res.render('error');
    }else
      try {
        res.render('index',  {json: results['rows']})
      }catch (fehler){

        res.render('error');
      }
  })
});

module.exports = router;
