const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('View'));
app.set('views', './View');

app.get('/idol_list', (req, res) => {
    res.sendFile(__dirname + '/View/html/idol_list.html');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/View/html/welcome_page.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/View/html/login.html');
});


app.listen(3000);