class AppManager {
    constructor() {
        this.reviews = [1,2,3]
        this.streets = []
        this.blocks = []
    }
    async getStreetsFromTlvApi(streetName) {
        const res = await $.get(`/streets/${streetName}`)
        this.streets = res

    }
        async getBlocksFromTlvApi() {
    }

    async getReviews() {
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

