const http = require('http');
const express = require('express');
const path = require('path');

const app = express();

require('./src/DB/DB_connect');

const User = require('./src/DB/DB_Model/user');
const {json} = require('express');
const {log} = require('console');

const userRoute = require('./src/route/userRoute.js');

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static('View'));
app.set('views', './View');

app.use('/', userRoute);

// app.get('/idol_list', (req, res) => {
//     res.sendFile(__dirname + '/View/html/idol_list.html');
// });

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/View/html/welcome_page.html');
// });

// app.get('/login', (req, res) => {
//     res.sendFile(__dirname + '/View/html/login.html');
// });

// app.post('/login', async(req, res) => {
//     try {
//         var username = req.body.username;
//         var password = req.body.password;

//         var findUser = await User.findOne({username: username});

//         if (findUser.password == password) {
//             res.sendFile(__dirname + '/View/html/idol_list.html');
//         } else {
//             res.send("wrong pass");
//         }
//     } catch (error) {
//         res.status(400).send('invalid');
//     }
// })

// app.get('/register', (req, res) => {
//     res.sendFile(__dirname + '/View/html/register.html');
// })

// app.post('/register', async(req, res) => {
//     try {
//         var username = req.body.username;
//         var password = req.body.password;

//         var findUser = await User.findOne({username: username});

//         if (findUser != null) {
//             return res.send("Invalid username");
//         } else {
//             var newUser = {"username": username, "password": password};
//             User.create(newUser, (err, res) => {
//                 if (err) throw err;
//             });
//             return res.send("Register successfully");
//         }
//     } catch (error) {
//         res.status(400).send('invalid');
//     }
// })

app.listen(3000);