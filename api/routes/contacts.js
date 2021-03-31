var express = require('express');
var router = express.Router();

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = require('../data/contacts.json');

  var filterList = data.filter( (item) => {
    var lowerCaseQuery = req.query.query.toLowerCase();
    return item.name.toLowerCase().includes(lowerCaseQuery) || 
            item.username.toLowerCase().includes(lowerCaseQuery) ||
            item.email.toLowerCase().includes(lowerCaseQuery) ||
            item.address.street.toLowerCase().includes(lowerCaseQuery) ||
            item.address.city.toLowerCase().includes(lowerCaseQuery)
  });

  function sortBy(field) {
    var key = function(x) { 
      return x[field]; 
    };
    return function(a, b) {
      a = key(a);
      b = key(b);
      return ((a > b) - (b > a));
    }
  }
  filterList.sort(sortBy(req.query.sortMode));
  res.send(filterList);
});

/* GET contact by id */
router.get('/:id', function(req, res, next) {
  const data = require('../data/contacts.json');

  var contact = null;
  for (var i = 0; i < data.length; i++) {
    if (data[i].id === parseInt(req.params.id)) {
      contact = data[i];
    }
  }

  res.send(contact)
});

module.exports = router;
