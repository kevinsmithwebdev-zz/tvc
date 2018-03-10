require('dotenv').config()

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
const authRoute = require('./routes/auth')
const indexRoute = require('./routes/index')

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
app.use(passport.initialize())
app.use(passport.session())

// define routes
app.use('/auth', authRoute)
app.use('/', indexRoute)


// configure passport


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
