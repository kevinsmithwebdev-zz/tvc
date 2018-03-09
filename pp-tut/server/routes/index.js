const express = require('express')

// const mongoose = require('mongoose')
// const passport = require('passport')

const router = express.Router()

// configure mongoose promises
// mongoose.Promise = global.Promise;


// GET to /protected
router.get('/protected', (req, res) => {
  if (req.user) {
    return res.send({ data: "Access allowed to protected route!" });
  }
  return res.send({ data: "Access DENIED to protected route - you're not logged in!" });
});

// GET to /protected
router.get('/unprotected', (req, res) => {

  return res.send({ data: "Welcome to uprotected route." });
});

module.exports = router
