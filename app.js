const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const { check, validationResult } = require('express-validator');

//init app
const app = express();

//view engine setup
app.set('views',path.join(__dirname,'Views'));
app.set('view engine','ejs');

//body-parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());



// Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//set routes
const pages = require('./Routes/pages');

app.use('/',pages);

module.exports = app;