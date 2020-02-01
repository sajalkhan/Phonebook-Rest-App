const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

//init app
const app = express();

//view engine setup
app.set('views',path.join(__dirname,'Views'));
app.set('view engine','ejs');

//body-parser middleware 
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//set public folder
app.use(express.static(path.join(__dirname,'public')));

//Session middleware
if (process.env.NODE_ENV == 'production') {
    app.use(session({
      secret: 'testSession',
      resave: false,
      saveUninitialized: false
    }));
  } else {
    app.use(session({
      secret: 'testSession',
      resave: false,
      saveUninitialized: true
    }));
  }

// Express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


//set routes
const contactInfo = require('./Routes/userContact');

app.use('/',contactInfo);

module.exports = app;