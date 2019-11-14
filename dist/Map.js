const reviewMarkers = []
let newMarker
let searchLocation
let geocoder
let map

function initialize() {
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

	const input = document.getElementById("search-street-input")
	const btn = document.getElementById("map-btn")

	const loadMap = () => {
		newMarker = null
		geocoder = new google.maps.Geocoder()
		map = new google.maps.Map(document.getElementById("map"), mapOptions)
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
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

			var latlng = {
				lat: newMarker.getPosition().lat(),
				lng: newMarker.getPosition().lng()
			}

			geocoder.geocode({'location': latlng}, function(results, status) {
				if (status === 'OK') {
					newMarker.street = results[0].address_components[1].short_name
				} else {
					window.alert('Geocoder failed due to: ' + status);
				}
			})	  
			return newMarker
		}

		$(".submit-review").on("click", () => {
			newMarker.setMap(null)
			newMarker = null
		})
		
		map.addListener("click", function(e) {
			placeMarker(e.latLng, map)
		})

	}
	loadMap()

	const makeMarker = (time, people, cleanliness, lighting, content, lat, lng) => {
		let contentString = `<div class="review-info-content">` +
		`<p class="review-info-time"><ion-icon class='ion-icon' name="time">
		</ion-icon> ${moment(time).format('HH:mm')}</p><br>` +
		`<p class="review-info-people"><ion-icon class='ion-icon' name="people">
		</ion-icon> ${people}</p>` +
		`<p class="review-info-cleanliness"><ion-icon class='ion-icon' name="trash">
		</ion-icon> ${cleanliness}</p>` +
		`<p class="review-info-lighting"><ion-icon class='ion-icon' name="flashlight">
		</ion-icon> ${lighting}</p><br>`+ 
		`<p class="review-info-content"><ion-icon class='ion-icon' name="clipboard">
		</ion-icon> ${content}</p></div>`

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

	function loadSearchLocation() {
		map.setCenter(searchLocation)
			const searchMarker = new google.maps.Marker({
				map: map,
				position: searchLocation
			})
	}

	function codeAddress(address) {
		geocoder.geocode({ address: address }, function(results, status) {
			if (status == "OK") {
				searchLocation = results[0].geometry.location
				mapOptions.zoom = 16
				loadMap()
				loadSearchLocation(searchLocation)
				makeReviewMarkers()
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
