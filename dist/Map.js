const streetMarkers = []
const reviewMarkers = []
let newMarker
let geocoder

function initialize() {
    geocoder = new google.maps.Geocoder();
    var mapOptions = {
        center: new google.maps.LatLng(32.060033, 34.769145),
        zoom: 14,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: true,
        draggable: true,
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: true,
        rotateControl: false
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions)

    var testReviews = { lat: 32.063032, lng: 34.774198 }

    function placeMarker(location) {
        if (newMarker == null) {
            newMarker = new google.maps.Marker({
                position: location,
                map: map
            })
        } else {
            newMarker.setPosition(location)
        }
        newMarker.setLabel('newMarker')
        return newMarker
    }

    $(".submit-review").on("click", () => {
        newMarker.setMap(null)
        newMarker = null
    })

    map.addListener("click", function (e) {
        placeMarker(e.latLng, map)
    })

    async function makeMarker(lng, lat, arr) {
        let marker = new google.maps.Marker({
            map: map,
            position: { lat: lat, lng: lng }
        })
        arr.push(marker)
    }

    async function makeStreetMarkers() {
        let response = await $.get('/streets')
        for (let street of response) {
            for (let a of street.path) {
                for (let b of a) {
                    let lng = b[0]
                    let lat = b[1]
                    makeMarker(lng, lat, streetMarkers)
                }
            }
        }
    }

    async function makeReviewMarkers() {
        let response = await $.get('/reviews')
        for (let review of response) {
            let lng = review.lng
            let lat = review.lat
            makeMarker(lng, lat, reviewMarkers)
        }
    }
    
    makeReviewMarkers()
        function codeAddress(address) {

    geocoder.geocode({ address: address }, function (results, status) {
        if (status == 'OK') {
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            // mapOptions = { center: new google.maps.LatLng(marker.position.lat(), marker.position.lng()), zooom: 20 }
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
    }
    $('.search-street').on('click', () => {
        let address = document.getElementById('search-street-input').value
        codeAddress(address)
    })
}
    

google.maps.event.addDomListener(window, "load", initialize)


