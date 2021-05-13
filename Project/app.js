const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('View'));
app.set('views', './View/html');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/View/html/welcome_page.html');
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});

app.listen(3000);