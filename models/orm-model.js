var orm = require("../config/orm.js");

var bucketlistData = {
    selectAll: function(cb) {
        orm.selectAll("*", "categories", function(res) {
            cb(res);
        });
    }
}

bucketlistData.selectAll(function(data) {
    console.log(data);
});