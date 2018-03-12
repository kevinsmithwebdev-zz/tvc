require('dotenv').config()


var _ = require("lodash");

// body, cookie, and session
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')
const expressSession = require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
})
var cors = require('cors')
const path = require('path')

const morgan = require('morgan')

const User = require('./models/user')

// passport
const LocalStrategy = require('passport-local').Strategy

const passport = require('passport')

// mongoose
const mongoose = require('mongoose')

// import routes
// const authRoute = require('./routes/auth')
// const indexRoute = require('./routes/index')

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

// start app and logger
const app = express()
app.use(morgan('dev'))

app.use(cors())
// app.options('*', cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser(process.env.SESSION_SECRET))
app.use(expressSession)

// define routes
// app.use('/auth', authRoute)
// app.use('/', indexRoute)

var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var users = [
  {
    username: 'jonathanmh',
    password: '%2yx4'
  },
  {
    username: 'test',
    password: 'test'
  },
  {
    username: 'asdf',
    password: 'asdfasdf'
  },
  {
    username: 'qwer',
    password: 'qwerqwer'
  },
  {
    username: 'zxcv',
    password: 'zxcvzxcv'
  }
];

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt")
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

app.use(passport.initialize())
app.use(passport.session())








app.get("/", function(req, res) {
  res.json({data: "Anyone can access the unprotected route!"});
});



app.post("/login", function(req, res) {
  if(req.body.username && req.body.password){
    var username = req.body.username;
    var password = req.body.password;
  }
  // usually this would be a database call:
  var user = users[_.findIndex(users, {username: username})];
  if( ! user ){
    res.status(401).json({message:"no such user found"});
  }

  if(user.password === req.body.password) {
    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    var payload = {id: user.id};
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ user, token });
  } else {
    res.status(401).json({message:"passwords did not match"});
  }
});



app.get("/secret", passport.authenticate('jwt', { session: false }), function(req, res) {
// app.get("/secret", function(req, res) {
  res.json({data: "Success! You can not see this without a token"});
});

app.get("/secretDebug",
  function(req, res, next){
    console.log(req.get('Authorization'));
    next();
  }, function(req, res){
    res.json("debugging");
});













// passport.use(new LocalStrategy(User.authenticate()))

// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));
//
//
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())

// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("\n*** server listening on port:", process.env.PORT, "\n")
})
.on('error', (err) => {
  console.error("error opening port:", process.env.PORT)
  console.error(err)
})
