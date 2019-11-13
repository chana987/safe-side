const streetMarkers = []
const reviewMarkers = []
let newMarker

function initialize() {
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
	
	map.addListener("click", function(e) {
		placeMarker(e.latLng, map)
	})
		
	const makeMarker = (time, people, cleanliness, lighting, content, lat, lng) => {
		let contentString = `<div class="review-info-content"><div class="review-info-content"><p class="review-info-time">Time: ${time}</p><p class="review-info-people">Crowds: ${people}</p><p class="review-info-cleanliness">Cleanliness: ${cleanliness}</p><p class="review-info-lighting">Lighting: ${lighting}</p><p class="review-info-content">Content: ${content}</p></div></div>`

		let infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		let marker = new google.maps.Marker({
			map: map,
			position: {lat: lat, lng: lng},
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
		let reviews = await $.get('/reviews')
		for (let review of reviews) {
			let time = review.time
			let people = review.people
			let cleanliness = review.cleanliness
			let lighting = review.lighting
			let content = review.content
			let lat = review.lat
			let lng = review.lng
			makeMarker(time, people, cleanliness, lighting, content, lat, lng)
		}
	}    

	makeReviewMarkers()
}
google.maps.event.addDomListener(window, "load", initialize)

