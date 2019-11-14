const appManager = new AppManager()
const renderer = new Renderer()

$("#search-reviews").on("click", async () => {
    await appManager.getReviewsFromDb()
    renderer.renderData(appManager.reviews)
})

$(".submit-review").on("click", async () => {
	let newReview = {
		time: new Date(`${$(".date-input").val()} ${$(".time-input").val()}`),
		lat: newMarker.getPosition().lat(),
		lng: newMarker.getPosition().lng(),
		content: $(".content-input").val(),
		people: $('input[name=people]:checked').val(),
		cleanliness: $('input[name=cleanliness]:checked').val(),
        lighting: $('input[name=lighting]:checked').val(),
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

$(function () {
    $(".add-review").click(function () {
        $("#map").toggle("fast")
    })
})
