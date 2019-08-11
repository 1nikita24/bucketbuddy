var connection = require("../db/connection");

// db/orm-models.js is the ORM models file which links to the config/orm.js
var bucklistQueries = require("../db/orm-models.js");
module.exports = function(app) {

    // ============ Express App TEST ============
    app.get("/api/testserver", function(req, resExpress) {
        resExpress.send("Express server is working - TEST PASSED!");
    });

    // ============ Database TEST ============
    app.get("/api/testdb", function(req, resExpress) {
        connection.query("SELECT * FROM notes", function(err, resSQL) {
            if (err) throw err;
            //   console.log(resSQL);
            //   console.log("mySQL DB working! TEST PASSED");
            resExpress.send("mySQL DB working! TEST PASSED");
        });

    });

    // search(GET)/api/search{select/where}

    // results(PUT)api/add{insert/into}

    // delete(DELETE)api/delete{delete/from}

    // list(GET)api/mylist{select/where/userid}

    // buddies(GET)api/buddies{select/where/[usD1]userID+activID=[usD2]userID+activID}

};
// ============ Express App TEST ============
app.get("/api/testserver", function(req, resExpress) {
    resExpress.send("Express server is working - TEST PASSED!");
});

// ============ Database TEST ============
app.get("/api/testdb", function(req, resExpress) {
    connection.query("SELECT * FROM categories", function(err, resSQL) {
        if (err) throw err;
        resExpress.send(
            "mySQL DB working! TEST PASSED" + "<hr>" + JSON.stringify(resSQL)
        );
    });
});

// ============ Get user profile route ============
app.get("/api/userprofile/:uid", function(req, resExpress) {
    userId = req.params.uid;
    bucklistQueries.selectUserPofile(userId, function(data) {
        console.log(data);
        resExpress.json(data);
    });
});

// ============ Get users bucklist items ============
app.get("/api/mylist/:uid", function(req, resExpress) {
    userId = req.params.uid;
    bucklistQueries.selectMyList(userId, function(data) {
        console.log(data);
        resExpress.json(data);
    });
});