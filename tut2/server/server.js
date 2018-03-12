require('dotenv').config()

var express = require("express");
var bodyParser = require("body-parser");
var jwt = require('jsonwebtoken');

var passport = require("passport");
const LocalStrategy = require('passport-local').Strategy
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;



var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'tasmanianDevil';

var strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  console.log('payload received', jwt_payload);
  // usually this would be a database call:
  var user = users[_.findIndex(users, {id: jwt_payload.id})];
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});






passport.use(strategy);

var app = express();
app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())


// mongoose
const mongoose = require('mongoose')
const User = require('./models/user')

// import routes
const authRoute = require('./routes/auth')
const testRoute = require('./routes/test')
const indexRoute = require('./routes/index')


const cors = require('cors')
app.use(cors())
// app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(passport.initialize())
app.use(passport.session())

// define routes
app.use('/auth', authRoute)
app.use('/test', testRoute)
app.use('/', indexRoute)


// passport.use(new LocalStrategy(User.authenticate()))

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));


passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("\n*** server listening on port:", process.env.PORT, "\n")
})
.on('error', (err) => {
  console.error("error opening port:", process.env.PORT)
  console.error(err)
})

// start mongoose
mongoose.connect(process.env.MONGODB)
.then(
  () => {
    console.log("\n*** mongo opened:", process.env.MONGODB, '\n')
  },
  err => {
    console.error("error starting mongo:", process.env.MONGODB)
    console.error(err)
  }
)
