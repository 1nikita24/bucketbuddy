// require("dotenv").config();

var express = require("express");
var sequelize = require("sequelize");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));


// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force: true}).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT http://localhost:" + PORT);
    });
});
