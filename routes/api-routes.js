var connection = require("../db/connection");

module.exports = function(app) {

    // ============ Express App TEST ============
  app.get("/api/testserver", function(req, resExpress) {
    resExpress.send("Express server is working - TEST PASSED!");
  });

  // ============ Database TEST ============
  app.get("/api/testdb", function(req, resExpress) {
    connection.query("SELECT * FROM categories", function(err, resSQL) {
      if (err) throw err;
    //   console.log(resSQL);
    //   console.log("mySQL DB working! TEST PASSED");
      resExpress.send("mySQL DB working! TEST PASSED" + "<hr>" + JSON.stringify(resSQL));
      
    });
   
  });
};
