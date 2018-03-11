const express = require('express')

const router = express.Router()
const passport = require('passport')



var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = 'tasmanianDevil';









// GET to /protected
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  // if (req.user) {
    return res.send({ data: "Access allowed to protected route!" });
  // }
  // return res.send({ data: "Access DENIED to protected route - you're not logged in!" });
})





// GET to /protected
router.get('/unprotected', (req, res) => {

  return res.send({ data: "Welcome to uprotected route." });
})

module.exports = router
