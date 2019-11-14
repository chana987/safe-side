const appManager = new AppManager()
const renderer = new Renderer()

$("#search-reviews").on("click", async () => {
    await appManager.getReviewsFromDb()
    renderer.renderData(appManager.reviews)
    console.log(appManager.reviews)
})



$(".submit-review").on("click", async () => {

	let newReview = {
		time: new Date(`${$(".date-input").val()} ${$(".time-input").val()}`),
		lat: newMarker.getPosition().lat(),
		lng: newMarker.getPosition().lng(),
		content: $(".content-input").val(),
		people: $(".people-input").val(),
		cleanliness: $(".cleanliness-input").val(),
        lighting: $(".lighting-input").val(),
        street: newMarker.street
	}
	$(".date-input").val("")
	$(".time-input").val("")
	$(".content-input").val("")
	$(".people-input").val("")
	$(".cleanliness-input").val("")
	$(".lighting-input").val("")
	await appManager.saveReview(newReview)

    await appManager.getReviewsFromDb()
    $(".success-message").append(
        `<p class="success-content">Your review has been added.</p>
		<p class="success-content">Thanks for your contribution!</p>`
    )
    setTimeout(function () {
        $(".success-message").empty()
    }, 2500)
})

// Toggle bottom menu 
$(function () {
    $(".add-review").click(function () {
        $("#map").toggle("fast")
    })
})
