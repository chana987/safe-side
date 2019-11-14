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
        const reviews = await $.get("/reviews")
        reviews.forEach(r => r.time = moment(r.time).format('HH:mm'))
		this.reviews = reviews
	}

	async saveReview(review) {
		await $.post("/review", review, () => {})
	}

	async _removeReview(review) {
		await $.delete("/reviews", review)
	}
}
