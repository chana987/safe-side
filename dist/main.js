const appmanager = new AppManger
const renderer = new Renderer
const map = new Map

const loadPage = async () => {
    renderer.renederer(appmanager.getReviews())
    map.initialize()
    map.showReports()

}

$(".search-reviews").on('click', async () => {

    await appmanager.getReviewsFromDb()

    renderer.renderData(appmanager.reviews)
})

$(".submit").on("click", () => {
    let newReview = {
        time: ('.time-input').val(),
        location: ('.location-input').val(),
        content: ('.content').val(),
        people: (".people").val(),
        dirty: (".dirty").val(),
        lighting: ('.lighting').val()
    }
    $.post('/reviews', newReview)
})

const searchOnMap = async () => {
    let input = ('.serch-input').val()
    await map.searchMap(input)

}

loadPage()
