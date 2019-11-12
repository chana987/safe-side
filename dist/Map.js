class Map {
    initialize() {
        const mapOptions = {
            center: new google.maps.LatLang(32.0853, 34.7818),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID,
            scrollwheel: false,
            draggable: false,
            panControl: true,
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            overviewMapControl: true,
            rotateControl: false
        }
        let map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions)
    }


    google.maps.event.addDomListener(window, 'load', initialize)


    showReviews() {

    }

    mapOptions() {

    }
    getLayers() {

    }
}
