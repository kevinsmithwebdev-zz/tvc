const express = require('express')

const router = express.Router()

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
