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