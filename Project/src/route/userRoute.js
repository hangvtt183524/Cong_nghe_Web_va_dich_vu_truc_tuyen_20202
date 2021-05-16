const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');

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

        var findUser = await User.findOne({username: username});
        
        if (findUser == null) {
            return res.send('Cannot find user');
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            else {
                bcrypt.compare(req.body.password, findUser.password, (err, isMatch) => {
                    if (err) throw err;
                    else if(!isMatch) {
                        res.send("Pass doesn't match");
                    }
                    else {
                        res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.html'));
                    }
                })
            }
        })
    } catch (error) {
        res.send(error);
    }
})

router.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '../../View/html', 'register.html'));
})

router.post('/register', async(req, res) => {
    try {
        var username = req.body.username;
        var findUser = await User.findOne({username: username});

        if (findUser != null) {
            res.send("Invalid username");
        }

        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            else {
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) throw err;
                    else {
                        var newUser = {"username": username, "password": hashedPassword};
                        User.create(newUser, (err, res) => {
                            if (err) throw err;
                        });
                        res.send("Register successfully");
                    }
                })
            }
        })
    } catch (error) {
        res.status(400).send('invalid');
    }
})

module.exports = router;