var idolIndex = 1;
showIdol(idolIndex);

function plusIdol(n) {
showIdol(idolIndex += n);
}

function showIdol(n) {
var i;
var x = document.getElementsByClassName("idol");
if (n > x.length) {idolIndex = 1}
if (n < 1) {idolIndex = x.length}
for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
}
x[idolIndex-1].style.display = "block";  
}

var modal = document.getElementById("myModal");
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}