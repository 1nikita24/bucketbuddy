var connection = require("../db/connection.js");

var orm = {
  selectAll: function(whatToSelect, tableInput, cb) {
    var queryString = "SELECT ?? FROM ??";
    console.log(whatToSelect + ":" + tableInput );
    connection.query(queryString, [whatToSelect, tableInput], function(err, result) {
      if (err) throw err;
      cb(result);
    });
  }  
};

module.exports = orm;
