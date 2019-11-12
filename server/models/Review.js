const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    time: Date,
    lat: Number,
    lng: Number,
    content: String,
    people: Number,
    cleanliness: Number,
    lighting: Number,
    streets: [ { nameHebrew: String, nameEnglish: String } ]
})

const Review = mongoose.model("review", reviewSchema)
module.exports = Review
