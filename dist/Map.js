// const streetMarkers = []
const reviewMarkers = []
let newMarker

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
	const map = new google.maps.Map(document.getElementById("map"), mapOptions)

	const testReviews = { lat: 32.063032, lng: 34.774198 }

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
		
	async function makeMarker(i, review){
		let contentString = '<div id="review-info-content">'+
		'<h1 class="review-info-heading">Review</h1>'+
			'<div class="review-info-content">'+
				`<p class="review-info-time">${review.time}</p>`
				`<p class="review-info-people">${review.people}</p>`
				`<p class="review-info-cleanliness">${review.cleanliness}</p>`
				`<p class="review-info-lighting">${review.lighting}</p>`
				`<p class="review-info-content">${review.content}</p>`
			'</div>'+
		'</div>'

		let infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		let marker = new google.maps.Marker({
			map: map,
			position: {lat: reviews[i].lat, lng: reviews[i].lng},
			title: i
		})

		marker.addListener('click', function() {
			infowindow.open(map, marker);
		});
		
		reviewMarkers.push(marker)
	}

	// async function makeStreetMarkers() {
	// 	let response = await $.get('/streets')
	// 	for (let street of response) {
	// 		for (let a of street.path) {
	// 			for (let b of a) {
	// 				let lng = b[0]
	// 				let lat = b[1]
	// 				makeMarker(lng, lat, streetMarkers)
	// 			}
	// 		}
	// 	}
	// }
	
	async function makeReviewMarkers() {
		let reviews = await $.get('/reviews')
		for (let i in reviews) {
			makeMarker(i)
		}
	}    

	makeReviewMarkers()
}

google.maps.event.addDomListener(window, "load", initialize)

