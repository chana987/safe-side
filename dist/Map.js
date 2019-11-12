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

	// var testReviews = [
	//         {
	//           position: new google.maps.LatLng(32.063032, 34.774198),
	//         }, {
	//           position: new google.maps.LatLng(32.060230, 34.769508),
	//         }]

	//       for (var i = 0; i < testReviews.length; i++) {
	//         var marker = new google.maps.Marker({
	//           position: testReviews[i].position,
	//           icon: icons[features[i].type].icon,
	//           map: map
	//         })
	//       }

	var marker = new google.maps.Marker({
		position: testReviews,
		map: map
	})

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
	
	map.addListener("click", function(e) {
		placeMarker(e.latLng, map)
	})
}
google.maps.event.addDomListener(window, "load", initialize)

// showReviews() {

// }

// mapOptions() {

// }
// getLayers() {

// }

function getReviewLocation() {
	
}
