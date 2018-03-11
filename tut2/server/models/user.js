const mongoose = require('mongoose')

const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
  passwordReset: { type: String, select: false },
  username: String
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)
