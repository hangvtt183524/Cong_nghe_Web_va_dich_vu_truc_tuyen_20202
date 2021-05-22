
var counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
    counter = 1;
    }
}, 2000);

var url_string = window.location.href;
var url = new URL(url_string);
var page = url.searchParams.get("page");

var number_page = document.getElementsByClassName("a_order_page");
for (var i=0; i< number_page.length; i++) {
    if (number_page[i].innerHTML == page) {
        number_page[i].parentElement.style.backgroundColor = "#9f7fee";
        break;
    }
}

function toInfoPage(id) {
    window.location.href = "/info/" + id; 
}