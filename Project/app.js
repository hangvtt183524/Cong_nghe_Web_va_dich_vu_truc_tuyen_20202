const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const {json} = require('express');
const {log} = require('console');

var session = require('express-session');
app.use(session({
    secret: 'topsecret', 
    resave: true, 
    saveUninitialized: true
}));

const userRoute = require('./src/route/userRoute.js');
const idolListRoute = require('./src/route/idolListRoute.js');
const infoIdolRoute = require('./src/route/infoIdolRoute.js');
const itemRoute = require('./src/route/itemRoute.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('View'));
app.set('views', './View');
app.set('view engine', 'ejs');
//app.set('view engine', 'html');

app.use('/', userRoute);
app.use('/', idolListRoute);
app.use('/', infoIdolRoute);
app.use('/', itemRoute);

app.get('/', (req, res) => {
    res.render(path.join(__dirname, '/View/html', 'welcome_page.ejs'), {session: {"loggedin": req.session.loggedin, "email": req.session.email}});
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/View/html/register.html'));
});

app.get('/info', (req, res) => {
    res.render(path.join(__dirname, '/View/html', 'info.ejs'), {session: {"loggedin": req.session.loggedin, "email": req.session.email}});
})
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