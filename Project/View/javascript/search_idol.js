var inputSearch = document.getElementById('search-input');

inputSearch.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
     event.preventDefault();
     document.getElementById("search-btn").click();
    }
});
