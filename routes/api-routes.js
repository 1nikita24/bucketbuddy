var connection = require("../db/connection");

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