const mongoose = require('mongoose')

const cardSchema = mongoose.Schema({
    term: String,
    definition: String,
    know: Boolean
})

module.exports = cardSchema