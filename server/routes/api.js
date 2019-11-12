const express = require('express')
const router = express.Router()
const requestPromise = require('request-promise')
const Review = require('../models/Review')

router.get('/streets', function (req, res) {
    requestPromise('https://api.tel-aviv.gov.il/gis/Layer?layerCode=838', function(err, response) {
        let parsedData = JSON.parse(response.body)
        let streetData = parsedData.features
        let streets = []
        for (let s of streetData) {
            let newStreet = {
                nameEnglish: s.attributes.shem_angli,
                nameHebrew: s.attributes.t_rechov,
                path: s.geometry.paths
            }
            streets.push(newStreet)
        }
        res.send(streets)
    })
})

router.get('/reviews', function (req, res) {
    Review.find({}, function (err, reviews) {
        res.send(reviews)
    })
})

router.post('/review', async function(req, res) {
    let newReview = new Review({ ...req.body, time: new Date(req.body.time) })
    await newReview.save()
    res.end()
})

module.exports = router
