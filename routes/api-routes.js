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
      // console.log(data);
      resExpress.json(data);
    });
  });

  // ============ Get all activities by Category (selectByCategory) ============
  app.get("/api/actbycat/:categoryId", function(req, resExpress) {
    categoryId = req.params.categoryId;
    if (categoryId < 1 || categoryId > 6) {
      bucklistQueries.selectAllActivities(function(data) {
        // console.log(data);
        resExpress.json(data);
      });
    } else {
      bucklistQueries.selectActivitiesByCategory(categoryId, function(data) {
        // console.log(data);
        resExpress.json(data);
      });
    }
  });

  // ============ Get users bucklist items ============
  app.get("/api/mylist/:uid", function(req, resExpress) {
    userId = req.params.uid;
    bucklistQueries.selectMyList(userId, function(data) {
      // console.log(data);
      resExpress.json(data);
    });
  });
  // ============ Get all categories ===============
  app.get("/api/categories", function(req, resExpress) {
    bucklistQueries.selectCategories(function(data) {
      // console.log(data);
      resExpress.json(data);
    });
  });
  // ======== Get users with same activityIds ========
  app.get("/api/findbuddies/:actId/:uid", function(req, resExpress) {
    actId = req.params.actId;
    uid = req.params.uid;
    bucklistQueries.findBuddies(actId, uid, function(data) {
      // console.log(data);
      resExpress.json(data);
    });
  });

  app.post("/api/insertmylist/:userid/:actid", function(req, resExpress) {
    bucklistQueries.insertMyList(
      ["userId", "activityId"],
      [req.params.userid, req.params.actid],
      function(result) {
        // Send back the ID of the new bucketlist item
        resExpress.json({ id: result.insertId });
      }
    );
  });

  app.delete("/api/deletemylist/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    bucklistQueries.deleteMyList(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  // ============ Get the count of all activites for ChartKick ===============
  app.get("/api/countactivities", function(req, resExpress) {
    bucklistQueries.countActivities(function(data) {
      //console.log(data);
      resExpress.json(data);
    });
  });

  app.get("/api/search/:searchTerms", function (req, res) {
  
    let searchParam = req.params.searchTerms
    searchParam = searchParam.split(",")
    
    console.log(searchParam)
    let queryString= `SELECT * FROM activities WHERE activity LIKE "%${searchParam[0]}%"`;
  
    for(let i = 1; i < searchParam.length; i++){
      queryString += ` OR title LIKE "%${searchParam[i]}%"`
    }
    console.log(queryString);
    connection.query(queryString, function (err, data) {
      if (err) {
        return res.status(500).end();
      }
      return res.json(data);
    })
  });

};
