function initialize() {
    var mapOptions = {
        center: new google.maps.LatLng(32.0853, 34.7818),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: false,
        draggable: false,
        panControl: true,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        overviewMapControl: true,
        rotateControl: false
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

    // showReviews() {

    // }

    // mapOptions() {

    // }
    // getLayers() {

    // }

