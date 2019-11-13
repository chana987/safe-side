const reviewMarkers = []
let newMarker
let geocoder

function initialize() {
	geocoder = new google.maps.Geocoder()
	const mapOptions = {
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
	const map = new google.maps.Map(document.getElementById("map"), mapOptions)

	// map.data.loadGeoJson('https://storage.cloud.google.com/tlv_son/streets.json')

	const input = document.getElementById("search-street-input")
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)

	const btn = document.getElementById("map-btn")
	map.controls[google.maps.ControlPosition.TOP_LEFT].push(btn)

	function placeMarker(location) {
		if (newMarker == null) {
			newMarker = new google.maps.Marker({
				position: location,
				map: map
			})
		} else {
			newMarker.setPosition(location)
		}
		newMarker.setLabel("")
		return newMarker
	}

	$(".submit-review").on("click", () => {
		newMarker.setMap(null)
		newMarker = null
		makeReviewMarkers()
	})

	map.addListener("click", function(e) {
		placeMarker(e.latLng, map)
	})

	const makeMarker = (time, people, cleanliness, lighting, content, lat, lng) => {
		let contentString = `<div class="review-info-content"><p class="review-info-time">Time: ${time}</p><p class="review-info-people">Crowds: ${people}</p><p class="review-info-cleanliness">Cleanliness: ${cleanliness}</p><p class="review-info-lighting">Lighting: ${lighting}</p><p class="review-info-content">Content: ${content}</p></div>`

		let infowindow = new google.maps.InfoWindow({
			content: contentString
		})

		let marker = new google.maps.Marker({
			title: "review",
			map: map,
			position: { lat: lat, lng: lng }
		})

		reviewMarkers.push(marker)
		marker.addListener("click", function() {
			infowindow.open(map, marker)
		})
	}

	async function makeReviewMarkers() {
		let reviews = await $.get("/reviews")
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

	function codeAddress(address) {
		geocoder.geocode({ address: address }, function(results, status) {
			if (status == "OK") {
				map.setCenter(results[0].geometry.location)
				const marker = new google.maps.Marker({
					map: map,
					position: results[0].geometry.location
				})
			} else {
				alert("Geocode was not successful for the following reason: " + status)
			}
		})
	}

	$(".search-street").on("click", () => {
		let address = document.getElementById("search-street-input").value
		codeAddress(address)
	})
}

google.maps.event.addDomListener(window, "load", initialize)
