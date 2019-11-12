class Markers {
    constructor() {
        this.streetMarkers = []
        this.reviewMarkers = []
    }
    
    makeMarker(lng, lat){
        let marker = new google.maps.Marker({
            map: map,
            draggable: true,
            position: {lat: lat, lng: lng}
        })
        markers.push(marker)
    }
    
    async makeReviewMarkers() {
        await $.get('/reviews', err, response)
        console.log(response)
    }
    
    async makeStreetMarkers() {
        await $.get('/streets', err, response)
        console.log(response)
    }
    
    
}