class Renderer {

    renderData(review) {

        const source = $("#review-template").html()
        const template = Handlebars.compile(source)
        let newHTML = template({review})
        $(".reviews").empty().append(newHTML)
    }
}
