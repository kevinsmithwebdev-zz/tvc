const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')

const router = express.Router()

const authentication = require('../config/authentication')

const User = require('../models/user.js')

//*************

router.post("/register", (req, res) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ error: "username and password required"} )
  }

  let { username, password, zipCode } = req.body

  User.count({ username }, (err, count) => {

    if (err) {
      console.error('### error checking DB for user count', err)
      throw err
    }
    if (count!==0)
      return res.status(400).json({ error: "username taken" })

    var newUser = new User({
      username,
      hash: password,
      zipCode
    })

    User.createUser(newUser, (err, user) => {
      if (err) {
        console.error('### error creating user', err)
        return res.status(500).json({ error: 'error creating user' })
      }
      return res.json({ user })
    })
  })
})

//*************

router.post("/login", (req, res) => {

  const rejectLogin = () => res.status(400).json({ error: "username and/or password do/es not match"})

  let { username, password } = req.body

  if (!username || !password)
    return rejectLogin()

  let user = User.getUserByUsername(username, (err, user) => {
    if (err) {
      console.error('### error looking up userByUsername', err)
      res.status(500).json({ error: 'error with DB looking up userName'})
    }

    if (!user)
      return rejectLogin()

    User.comparePassword(password, user.hash, (err, isMatch) => {
      if (err) throw err
      if (!isMatch)
        return rejectLogin()

      var payload = { id: user._id }
      var token = authentication.getToken(payload)
      res.json( { user, token } )
    })
  })
})

//*************

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).send({ msg: "logged out" })
})

//*************

router.get('/checkjwt', passport.authenticate('jwt', { session: false }), (req, res) => {
  console.log('checkjwt req.user', req.user)
  res.status(200).json({ user: req.user })
})

//*************

module.exports = router
