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
		people: $(".people-input").val(),
		cleanliness: $(".cleanliness-input").val(),
		lighting: $(".lighting-input").val(),
        content: $(".content-input").val()
    }
    $(".date-input").val("")
    $(".time-input").val("")
    $(".people-input").val("")
    $(".cleanliness-input").val("")
    $(".lighting-input").val("")
    $(".content-input").val("")
    await appManager.saveReview(newReview)
    await appManager.getReviewsFromDb()
    renderer.renderData(appManager.reviews)
})
