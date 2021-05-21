const searchIdol = document.getElementById('search-image');
const searchInput = document.getElementById('search-input');

searchInput.addEventListener("keyup", event => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      event.preventDefault();
      searchIdol.click();
    }
  });

searchIdol.addEventListener('click', function(e) {
    window.location.href = "/idol_list?name=" + document.getElementById('search-input').value; 
});