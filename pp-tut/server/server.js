// should be saved in a .env file to protect
process.env.JWT_SECRET="jwtsecret"
process.env.MONGODB='mongodb://localhost/tvcpptut'
process.env.PORT=8080
process.env.JWT_EXP = 10 * 60 // JWT expiration time in seconds

// *************

const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const mongoose = require('mongoose')
const cors = require('cors')
const morgan = require('morgan')

const authRoute = require('./routes/auth')
const dataRoute = require('./routes/data')

// *************

const app = express()

app.use(cors())
app.use(morgan('tiny'))
app.use(passport.initialize())
app.use(bodyParser.json())

// routes

app.use('/auth', authRoute)
app.use('/data', dataRoute)

// ***************************************
// ***************************************
// ***************************************

// starting app and DB

let runningExpress = false
let runningMongo = false

const confirmRunning = () => {
  if (runningExpress && runningMongo) {
    console.log("\nServer and DB now running. You can confirm it by checking url:")
    console.log("http://localhost:" + process.env.PORT + "/test")
  }
}

// test route
app.get("/test", (req, res) => {
  res.json({ message: "Server up and running!", runningExpress, runningMongo })
})

// start app
app.listen(process.env.PORT)
.on('listening', () => {
  console.log("\nserver listening on port:", process.env.PORT, "\n")
  runningExpress = true
  confirmRunning()
})
.on('error', (err) => {
  console.error("### error opening port:", process.env.PORT)
  console.error(err)
})

// start mongo
mongoose.connect(process.env.MONGODB)
.then(
  () => {
    console.log("\nmongo opened:", process.env.MONGODB, '\n')
    runningMongo = true
    confirmRunning()
  },
  err => {
    console.error("### error starting mongo:", process.env.MONGODB)
    console.error(err)
  }
)
