const searchImage = document.getElementById('search-image');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener("keyup", event => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      searchImage.click();
    }
  });

searchImage.addEventListener('click', function(e) {
    window.location.href = "/items?item=" + searchInput.value; 
});

var url_string = window.location.href;
var url = new URL(url_string);
var categorical = url.searchParams.get("categorical");

var type = document.getElementsByClassName("cateName");
for (var i=0; i< type.length; i++) {
    if (type[i].innerHTML == categorical) {
        type[i].parentElement.style.backgroundColor = "#9f7fee";
        break;
    }
}
