const form = document.getElementById('form');

form.addEventListener('submit', () => {
    var email = document.getElementById('email').value;
    var re = fetch('/forget_password', {
        method: 'post',
        body: JSON.stringify({email: email}),
        headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.data);

    alert(re);
});