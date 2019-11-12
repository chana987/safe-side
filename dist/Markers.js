class Markers {
    constructor() {
        this.streetMarkers = []
        this.reviewMarkers = []
    }
    
    async makeMarker(lng, lat, arr){
        let marker = new google.maps.Marker({
            map: map,
            position: {lat: lat, lng: lng}
        })
        arr.push(marker)
    }

    async makeStreetMarkers() {
        let response = await $.get('/streets')
        for (let street of response) {
            for (let a of street.path) {
                for (let b of a) {
                    let lng = b[0]
                    let lat = b[1]
                    this.makeMarker(lng, lat, this.streetMarkers)
                }
            }
        }
    }
    
    async makeReviewMarkers() {
        let response = await $.get('/reviews')
        for (let review of response) {
            let lng = review.lng
            let lat = review.lat
            this.makeMarker(lng, lat, this.reviewMarkers)
        }
    }    
}