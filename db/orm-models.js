var orm = require("../config/orm.js");

var bucklistQueries = {
  selectAll: function(cb) {
    orm.selectAll("*", "categories", function(res) {
      cb(res);
    });
  },
  selectUserPofile: function(findUser, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.selectUserPofile("userProfiles", "uid", findUser, function(res) {
      cb(res);
    });
  },
  selectMyList: function(findUser, cb) {
    // tableInput, colToSearch, valOfCol, cb
    orm.selectMyList(findUser, function(res) {
      cb(res);
    });
  },
  selectCategories: function(cb) {
    orm.selectCategories("*", "category", function(res) {
      cb(res);
    });
  },
};

module.exports = bucklistQueries;
