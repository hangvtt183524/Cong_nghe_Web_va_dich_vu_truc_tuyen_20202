const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;


router.post('/login', async(req, res, next) => {
    try {
        var email = req.body.email;

        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            dbo.collection("users").find({ "email": email }).toArray((err, result) => {
                if (err) print(err);
                else {
                    if (result == null) {
                        res.send("You have not registed yet!");
                    }
                    else {
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            else {
                                bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
                                    if (err) throw err;
                                    else if(!isMatch) {
                                        res.send("Pass doesn't match");
                                    }
                                    else {
                                        res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.html'));
                                    }
                                });
                            }
                        });
                    }
                }
                db.close();
            });
            
        });   
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

router.post('/register', async(req, res) => {
    try {
        var email = req.body.email;

        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            dbo.collection("users").find({ "email": email}).toArray((err, result) => {
                if (err) print(err);
                else {
                    if (result != null) {
                        res.send("Exists Email");
                    }
                    else {
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            else {
                                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                                    if (err) throw err;
                                    else {
                                        var newUser = {"email": email, "password": hashedPassword};
                                        dbo.collection('users').insertOne(newUser, (err, resInsert) => {
                                            if (err) throw err;
                                            console.log("inserted");  
                                            return res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.html'));
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
                db.close();
            });
            
        });   
    } catch (error) {
        res.status(400).send('invalid');
    }
})

module.exports = router;