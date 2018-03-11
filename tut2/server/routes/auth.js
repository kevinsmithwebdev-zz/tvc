// const crypto = require('crypto')
const express = require('express')

const mongoose = require('mongoose')
const passport = require('passport')


var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'tasmanianDevil';


const User = require('../models/user.js')

const router = express.Router()

// configure mongoose promises
mongoose.Promise = global.Promise;


// GET to /checksession
router.get('/checksession', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('checksession', req.user)
  if (req.user) {
    return res.send(JSON.stringify(req.user));
  }
  return res.send(JSON.stringify({ err: "not logged in" }));
});


// POST to /login
router.post('/login', async (req, res) => {
  // look up the user by their email
  console.log('req.body', req.body)
  const query = User.findOne({ username: req.body.username });
  const foundUser = await query.exec();

  req.user = foundUser

  console.log('foundUser', foundUser)

  // if they exist, they'll have a username, so add that to our body
  // if (foundUser) { req.body.username = foundUser.username; }

  passport.authenticate('local')(req, res, () => {
    // If logged in, we should have user info to send back
    // if (req.user) {
    //   return res.send(JSON.stringify(req.user));
    // }

    // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
    console.log('$$$ req.user', req.user)
    if (req.user) {
      var payload = {id: req.user.username};
      var token = jwt.sign(payload, jwtOptions.secretOrKey);
      console.log('token', token)
      res.json({message: "ok", token: token});
    } else {
      res.status(401).json({message:"passwords did not match"});
    }


    // Otherwise return an error
    // return res.send(JSON.stringify({ error: 'There was an error logging in' }));
  });

  // res.send({data: 'end of the line'})
});

// GET to /logout
router.get('/logout', (req, res) => {
  req.logout();
  return res.send(JSON.stringify(req.user));
});


// POST to /register
router.post('/register', async (req, res) => {
  // First, check and make sure the email doesn't already exist
  const query = User.findOne({ username: req.body.username })
  const foundUser = await query.exec()

  if (foundUser) {
    return res.send(JSON.stringify({ error: 'Username already taken' }))
  }
  // Create a user object to save, using values from incoming JSON
  if (!foundUser) {
    const newUser = new User(req.body);

    // Save, via Passport's "register" method, the user
    return User.register(newUser, req.body.password, (err) => {
      // If there's a problem, send back a JSON object with the error
      if (err) {
        return res.send(JSON.stringify({ error: err }));
      }
      // Otherwise log them in
      return passport.authenticate('local')(req, res, () => {
        // If logged in, we should have user info to send back
        if (req.user) {
          req.session.user = req.user
          return res.send(JSON.stringify(req.user));
        }
        // Otherwise return an error
        return res.send(JSON.stringify({ error: 'There was an error registering the user' }));
      });
    });
  }
})


// GET to /test -- route tester
router.get('/test', (req, res) => {
  console.log('GET auth/test')
  res.send({ greeting: "Hello, from /test!" })
})

module.exports = router
