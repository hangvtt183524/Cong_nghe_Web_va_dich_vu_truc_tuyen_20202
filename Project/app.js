const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

//require('./src/DB/DB_connect');


const {json} = require('express');
const {log} = require('console');

const userRoute = require('./src/route/userRoute.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('View'));
app.set('views', './View');
app.set('view engine', 'ejs');
//app.set('view engine', 'html');

app.use('/', userRoute);

app.get('/idol_list', (req, res) => {
    res.sendFile(path.join(__dirname, '/View/html/idol_list.html'));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/View/html/welcome_page.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/View/html/register.html'));
});
/*
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '/test.html'));
});

app.post('/test', (req, res) => {
    res.json({"return": "abc"});
});
*/
app.listen(3000);