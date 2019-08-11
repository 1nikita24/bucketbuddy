var connection = require("../db/connection.js");

var orm = {
  selectAll: function(whatToSelect, tableInput, cb) {
    var queryString = "SELECT ?? FROM ??";
    console.log(whatToSelect + ":" + tableInput);
    connection.query(queryString, [whatToSelect, tableInput], function(
      err,
      result
    ) {
      if (err) throw err;
      // console.log(result);
      cb(result);
    });
  },
  selectUserPofile: function(tableInput, colToSearch, valOfCol, cb) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";

    connection.query(queryString, [tableInput, colToSearch, valOfCol], function(
      err,
      result
    ) {
      if (err) throw err;
      // console.log(result);
      cb(result);
    });
  },
  selectMyList: function(valOfCol, cb) {
    var queryString =
      "SELECT userProfiles.uid, userProfiles.name, bucketLists.activityId, activities.activity, activities.categoryId, categories.category";
    queryString += " FROM userProfiles";
    queryString +=
      " INNER JOIN bucketLists ON userProfiles.id = bucketLists.userId";
    queryString +=
      " INNER JOIN activities ON bucketLists.activityId = activities.id";
    queryString +=
      " INNER JOIN categories ON activities.categoryId = categories.id";
    queryString += " WHERE userProfiles.uid = ?";

    connection.query(queryString, [valOfCol], function(err, result) {
      if (err) throw err;
      // console.log(result);
      cb(result);
    });
  },
  selectCategories: function(whatToSelect, tableInput, cb) {
    var queryString = "SELECT ?? FROM ??";
    console.log(whatToSelect + ":" + tableInput);
    connection.query(queryString, [whatToSelect, tableInput], function(
      err,
      result
    ) {
      if (err) throw err;
      // console.log(result);
      cb(result);
    });
  },
  
}; // end orm var

module.exports = orm;
