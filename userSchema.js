const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    FreeletID: String,
    username: String,
    password: String
})



module.exports = userSchema