$.getJSON("pages.json", function (data) { // load pages from JSON file
    const pages = data;
    $("#searchInput").autocomplete({ // activate autocomplete once pages has loaded
        source:
            function (request, response) {
                var term = request.term;
                var currentPages = [];
                $.each(pages, function (idx, elem) {
                    if (elem.Name.toLowerCase().indexOf(term.toLowerCase()) > -1) {
                        currentPages.push({ id: elem.Name, label: elem.Name, url: elem.Url });
                    }
                });
                if (currentPages.length <= 0) {
                    currentPages = [{ id: null, label: 'No Results Found', url: null }]; // Add default message if no matching results
                }
                response(currentPages);
            },
        position: {
            of: '#searchBoxContainer',
            my: 'left top',
            at: 'left bottom'
        },
        minLength: 3, // set minimum to 3 chars
        select: function (event, ui) {
            var url = $.trim(ui.item.url); // when an option gets clicked, redirect if it has a valid URL
            if (url === null || url === "") {
                return;
            }
            window.location = url;
        }
    });

    $.ui.autocomplete.prototype._resizeMenu = function () { // this chunck will resize the drop down when the window resizes
        var ul = this.menu.element;
        ul.outerWidth(this.element.outerWidth());
    };
}).fail(function () {
    // throw error
    alert('getJSON request failed! ');
});
