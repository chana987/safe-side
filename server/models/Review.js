const mongoose = require('mongoose')
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    
})

const Review = mongoose.model("review", reviewSchema)
module.exports = Review
