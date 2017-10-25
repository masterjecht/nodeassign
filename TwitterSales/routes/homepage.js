// setting modules
var express = require('express');
var Twitter = require('twitter');



var router = express.Router();

/* GET home page. */
  router.get('/', function(req, res, next) {
         res.render('homepage');

});

module.exports = router;
