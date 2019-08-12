var orm = require("../config/orm.js");

var bucklistQueries = {
  selectAll: function(cb) {
    orm.selectAll("*", "categories", function(res) {
      cb(res);
    });
  },
  selectAllActivities: function(cb) {
    orm.selectAll("*", "activities", function(res) {
      cb(res);
    });
  },
  selectUserPofile: function(findUser, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.selectUserPofile("userProfiles", "uid", findUser, function(res) {
      cb(res);
    });
  },
  selectActivitiesByCategory: function(findCategory, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.selectActivitiesByCategory(
      "activities",
      "categoryId",
      findCategory,
      function(res) {
        cb(res);
      }
    );
  },
  selectMyList: function(findUser, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.selectMyList(findUser, function(res) {
      cb(res);
    });
  },
  selectCategories: function(cb) {
    // whatToSelect, tableInput
    orm.selectCategories("*", "categories", function(res) {
      cb(res);
    });
  },
  findBuddies: function(actId, uid, cb) {
    // valOfActId, valOfUid
    orm.findBuddies(actId, uid, function(res) {
      cb(res);
    });
  }
};

module.exports = bucklistQueries;
