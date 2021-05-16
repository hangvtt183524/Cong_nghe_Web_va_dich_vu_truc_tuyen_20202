const express = require('express');
const router = express.Router();
const path = require('path');

const User = require('../DB/DB_Model/user');

router.get('/idol_list', (req, res) => {
    res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../View/html', 'welcome_page.html'));
});

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '../../View/html', 'login.html'));
})

router.post('/login', async(req, res, next) => {
    try {
        var username = req.body.username;
        var password = req.body.password;

        var findUser = await User.findOne({username: username});

        if (findUser.password == password) {
            res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.html'));
        } else {
            res.send("wrong pass");
        }
    } catch (error) {
        res.status(400).send('invalid');
    }
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../View/html', 'register.html'));
})

router.post('/register', async(req, res) => {
    try {
        var username = req.body.username;
        var password = req.body.password;

        var findUser = await User.findOne({username: username});

        if (findUser != null) {
            return res.send("Invalid username");
        } else {
            var newUser = {"username": username, "password": password};
            User.create(newUser, (err, res) => {
                if (err) throw err;
            });
            return res.send("Register successfully");
        }
    } catch (error) {
        res.status(400).send('invalid');
    }
})

module.exports = router;