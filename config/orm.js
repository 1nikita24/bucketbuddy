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
      "SELECT userprofiles.uid, userprofiles.name, bucketlists.activityId, activities.activity, activities.categoryId, categories.category";
    queryString += " FROM userprofiles";
    queryString +=
      " INNER JOIN bucketlists ON userprofiles.id = bucketlists.userId";
    queryString +=
      " INNER JOIN activities ON bucketlists.activityId = activities.id";
    queryString +=
      " INNER JOIN categories ON activities.categoryId = categories.id";
    queryString += " WHERE userprofiles.uid = ?";

    connection.query(queryString, [valOfCol], function(err, result) {
      if (err) throw err;
      // console.log(result);
      cb(result);
    });
  }
}; // end orm var

module.exports = orm;
