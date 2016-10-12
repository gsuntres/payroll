var express = require('express');
var router = express.Router();

router.get('/search-by-name', function(req, res) {
  res.render('employees/search_by_name', {
    title: 'Search Employee',
    employees: true,
    searchByName: true
  });
});

router.get('/search-by-sin', function(req, res) {
  res.render('employees/search_by_sin', {
    title: 'Search Employee',
    employees: true,
    searchBySin: true
  });
});

module.exports = router;
