const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    time: Date,
    location: [Number],
    content: String,
    people: Number,
    dirty: Number,
    lighting: Number
})

const Review = mongoose.model("review", reviewSchema)
module.exports = Review
