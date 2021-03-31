var express = require('express');
var router = express.Router();

/* GET contacts listing. */
router.get('/', function(req, res, next) {
  const data = require('../data/contacts.json');

  var filterList = data.filter( (item) => {
    var lowerCaseQuery = query.toLowerCase();
    return item.name.toLowerCase().includes(lowerCaseQuery) || 
            item.username.toLowerCase().includes(lowerCaseQuery)
  });

  function sortBy(field, reverse) {
    var key = function(x) { 
      return x[field]; 
    };
    return function(a, b) {
      a = key(a);
      b = key(b);
      if (reverse) {
        return ((b > a) - (a > b));
      }
      return ((a > b) - (b > a));
    }
  }

  filterList.sort(sortBy(req.query.sorting, req.query.direction));

  res.send(filterList);
});

module.exports = router;
