const appManager = new AppManager()
const renderer = new Renderer()

$(".search-reviews").on("click", async () => {
	await appManager.getReviewsFromDb()
	renderer.renderData(appManager.reviews)
})

$(".submit-review").on("click", async () => {
	let newReview = {
		time: new Date(`${$(".date-input").val()} ${$(".time-input").val()}`),
        lat: newMarker.getPosition().lat(),
        lng: newMarker.getPosition().lng(),
		content: $(".content-input").val(),
		people: $(".people-input").val(),
		cleanliness: $(".cleanliness-input").val(),
		lighting: $(".lighting-input").val()
	}
    await appManager.saveReview(newReview)
    await appManager.getReviewsFromDb()
    renderer.renderData(appManager.reviews)
})
