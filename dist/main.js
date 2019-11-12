const appmanager = new AppManager()
const renderer = new Renderer()

const loadPage = async () => {}

$(".search-reviews").on("click", async () => {
	await appmanager.getReviewsFromDb()
	renderer.renderData(appmanager.reviews)
})

$(".submit").on("click", async () => {
	let newReview = {
		time: new Date(`${$(".date-input").val()} ${$(".time-input").val()}`),
        lat: newMarker.getPosition().lat(),
        lng: newMarker.getPosition().lng(),
		content: $(".content-input").val(),
		people: $(".people-input").val(),
		cleanliness: $(".cleanliness-input").val(),
		lighting: $(".lighting-input").val()
	}
	await appmanager.saveReview(newReview)
})

const searchOnMap = async () => {
	let input = $(".search-street-input").val()
	await map.searchMap(input)
}

loadPage()
