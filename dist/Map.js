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
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    var testReviews = {lat: 32.063032, lng: 34.774198}
  
    var marker = new google.maps.Marker({
        position: testReviews,
        map: map,
    })
}
google.maps.event.addDomListener(window, 'load', initialize);

    // showReviews() {

    // }

    // mapOptions() {

    // }
    // getLayers() {

    // }

