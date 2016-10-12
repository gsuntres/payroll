var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('home/welcome', {
    title: 'Home',
    home: true,
    welcome: true
  });
});

router.get('/companies', function(req, res) {
  res.render('home/companies', {
    title: 'Companies',
    home: true,
    companies: true
  });
});

module.exports = router;
