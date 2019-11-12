const appmanager = new AppManager
const renderer = new Renderer

const loadPage = async () => {
  
}

$(".search-reviews").on('click', async () => {
    await appmanager.getReviewsFromDb()
    renderer.renderData(appmanager.reviews)
})

$(".submit").on("click", async () => {
    let newReview = {
        time: new Date(),
        location: newMarker.getPosition(),
        // location:  [34.77407946097447,32.03525683410125],
        content: $('.content-input').val(),
        people: $(".people-input").val(),
        dirty: $(".dirty-input").val(),
        lighting: $('.lighting-input').val()
    }
    console.log("new review" + newReview.location)
    await appmanager.saveReview(newReview)
    console.log("finished saving")
})

const searchOnMap = async () => {
    let input = $('.search-street-input').val()
    await map.searchMap(input)
}

loadPage()
