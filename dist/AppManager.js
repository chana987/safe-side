class AppManager {
    constructor() {
        this.reviews = []
        this.streets = []
    }

    async getStreetsFromTlvApi(streetName) {
        const res = await $.get(`/streets/${streetName}`)
        this.streets = res
    }
        
    async getReviewsFromDb() {
        const review = await $.get('/reviews')
        this.reviews = review
    }

    async saveReview(review) {
        await $.post('/review', review, () => {})
    }
    
    async _removeReview(review) {
        await $.delete('/reviews',review)
    }
}

