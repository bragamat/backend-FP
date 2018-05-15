/*jshint esversion: 6*/
// "use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const app         = express();

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const cors = require('cors');
// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const routesRoutes = require("./routes/routes");

const methodOverride = require('method-override');

app.use(methodOverride('_method'))


// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

let corsOptions = {}
if (app.settings.env === 'production') {
  // Configuration in production mode should be per domain!
  const corsWhitelist = ['http://example1.com', 'https://example2.com']
  corsOptions = {
    origin: (origin, callback) => {
      if (corsWhitelist.indexOf(origin) !== -1) callback(null, true)
      else callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))
// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));


// Mount all resource routes
app.use("/users", usersRoutes(knex));
app.use("/routes", routesRoutes(knex));


// Home page
app.get("/", (req, res) => {
  res.redirect('/routes')
});

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
