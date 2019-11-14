const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    time: Date,
    lat: Number,
    lng: Number,
    content: String,
    people: String,
    cleanliness: String,
    lighting: String,
    street: String
})

const Review = mongoose.model("review", reviewSchema)
module.exports = Review
