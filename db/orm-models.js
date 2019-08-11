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
    // whatToSelect, tableInput
    orm.selectCategories("*", "categories", function(res) {
      cb(res);
    });
  },

  findBuddies: function(findUser,cb) {
    // valOfActId, valOfUid
    orm.findBuddies(5,"sUT5cnwz3He8kEo3NHksK6osX0J2",findUser, function(res){
        cb(res);
    });
  },
};

module.exports = bucklistQueries;
