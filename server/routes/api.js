const express = require('express')
const router = express.Router()
const requestPromise = require('request-promise')
const Review = require('../models/Review')

// router.get('/streets', function (req, res) {
//     requestPromise('https://api.tel-aviv.gov.il/gis/Layer?layerCode=838', function(err, response) {
//         let parsedData = JSON.parse(response.body)
//         let allData = parsedData.features
//         let streetData = allData.slice(1)
//         let streets = {
//             type: "FeatureCollection",
//             features: []
//         }
//         for (let s of streetData) {
//             let newStreet = {
//                 type: "Feature",
//                 properties: {
//                     strokeColor: '#FF0000',
//                     strokeOpacity: 1.0,
//                     strokeWeight: 3,
//                 },
//                 geometry: {
//                     type: "Polygon",
//                     coordinates: []
//                 } 
//             }
//             for (let array of s.geometry.paths) {
//                 for (let coords of array) {
//                     let lat = coords[0]
//                     let lng = coords[1]
//                     newStreet.geometry.coordinates.push([lat, lng])
//                 }
//             }
//             streets.features.push(newStreet)
//         }
//         res.send(JSON.stringify(streets))
//     })
// })

// router.get('/blocks', function (req, res) {
//     requestPromise('https://api.tel-aviv.gov.il/gis/Layer?layerCode=626', function(err, response) {
//         let parsedData = JSON.parse(response.body)
//         let blockData = parsedData.features
//         let blocks = {
//             type: "FeatureCollection",
//             features: []
//         }
//         for (let s of blockData) {
//             let newBlock = {
//                 type: "Feature",
//                 properties: {
//                     strokeColor: '#FF0000',
//                     strokeOpacity: 1.0,
//                     strokeWeight: 3,
//                 },
//                 geometry: {
//                     type: "Polygon",
//                     coordinates: []
//                 } 
//             }
//             for (let coords of s.geometry.rings[0]) {
//                 let lat = coords[0]
//                 let lng = coords[1]
//                 newBlock.geometry.coordinates.push([lat, lng])
//             }
//             blocks.features.push(newBlock)
//         }
//         res.send(blocks)
//     })
// })

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
