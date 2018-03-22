const passport = require("passport")
const passportJWT = require("passport-jwt")
const jwt = require('jsonwebtoken')

const User = require('../models/user.js')

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: process.env.JWT_SECRET
}

const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
  User.getUserById(jwtPayload.id, (err, user) => {
    if (err)
      next(err, false)
    if (user) {
      next(null, user)
    } else {
      next(null, false)
    }
  })
})

passport.use(strategy)

module.exports.getToken = (payload) => {
  payload.exp = Math.round(Date.now()/1000) + parseInt(process.env.JWT_EXP)
  return jwt.sign(payload, jwtOptions.secretOrKey)
}
