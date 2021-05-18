const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const {json} = require('express');
const {log} = require('console');

const userRoute = require('./src/route/userRoute.js');
const idolListRoute = require('./src/route/idolListRoute.js');


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('View'));
app.set('views', './View');
app.set('view engine', 'ejs');
//app.set('view engine', 'html');

app.use('/', userRoute);
app.use('/', idolListRoute);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/View/html/welcome_page.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/View/html/register.html'));
});
/*
app.get('/test', (req, res) => {
    var User = null;
    User = require('./src/route/userRoute.js').user;
    console.log(User);
});

app.post('/test', (req, res) => {
    res.json({"return": "abc"});
});
*/

app.listen(3000);