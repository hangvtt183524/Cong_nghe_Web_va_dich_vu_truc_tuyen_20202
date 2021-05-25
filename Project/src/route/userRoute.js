const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const nodemailer =  require('nodemailer');

router.post('/login_file', async(req, res, next) => {
    try {
        var email = req.body.email;
        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            dbo.collection("users").find({ "email": email }).toArray((err, result) => {
                if (err) print(err);
                else {
                    if (result == null || result == undefined || result.length == 0) {
                        console.log("email:" + email);
                        //alert("You have not registed yet!");
                        db.close();
                        res.render(path.join(__dirname, '../../View/html', 'login.ejs'), {message:'You have not registered yet!'});
                    }
                    else {
                        bcrypt.genSalt(10, (err, salt) => {
                            if (err) throw err;
                            else {
                                bcrypt.compare(req.body.password, result[0].password, (err, isMatch) => {
                                    if (err) throw err;
                                    else if(!isMatch) {
                                        res.render(path.join(__dirname, '../../View/html', 'login.ejs'), {message:'Password is wrong!'});
                                    }
                                    else {
                                        console.log("Correct");
                                        db.close();
                                        module.exports.currentUser = {"email": email, "password": req.body.password};
                                        req.session.loggedin = true;
                                        req.session.email = email;
                                        res.redirect('/');
                                        //res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.html'));
                                    }
                                });
                            }
                        });
                    }
                }
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
                    if (result.length > 0) {
                        console.log("result: " + result.length);
                        res.json({"message": "Exists Email"});
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
                                            return res.sendFile(path.join(__dirname, '../../View/html', 'idol_list.ejs'));
                                            db.close();
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            });
        });   
    } catch (error) {
        res.status(400).send('invalid');
    }
})

router.get('/login', (req, res) => {
    res.render(path.join(__dirname, '../../View/html', 'login.ejs'), {message:''});
})

router.get('/forget_password', (req, res) => {
    res.sendFile(path.join(__dirname, '../../View/html', 'forget_pass.html'), {message:''});
})

router.post('/forget_password', async(req, res) => {
    try {
        var email = req.body.email;

        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            dbo.collection("users").find({ "email": email}).toArray((err, result) => {
                if (err) print(err);
                else {
                    if (result.length > 0) {
                        var id = result[0]._id;
                        var link = `http://localhost:3000/reset-password/${id}`;
                        var transporter =  nodemailer.createTransport({ 
                            service: 'Gmail',
                            auth: {
                                user: 'duidol.cnweb@gmail.com',
                                pass: 'hihi0000'
                            }
                        });
                        var mainOptions = { 
                            from: 'DUIDOL',
                            to: result[0].email,
                            subject: 'Password reset email',
                            html: "If you requested a password reset for " + result[0].email + ", click the link below. If you didn't make this request, ignore this email. <br><a href=" + link + ">Reset password</a>"
                        }
                        transporter.sendMail(mainOptions, (err, info) => {
                            if (err) {
                                console.log(err);
                                res.json({"message": "fail"});
                            } else {
                                console.log('Message sent: ' +  info.response);
                                res.json({"message": "Reset password link has been sent"});
                            }
                        });
                    }
                    else {
                        res.json({"message": "email not exist"});
                    }
                }
            });
        });   
    } catch (error) {
        res.status(400).send('invalid');
    }
})

router.get('/reset-password/:id/', (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id);
        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            var ObjectId = require('mongodb').ObjectId; 
            var o_id = new ObjectId(id);
            dbo.collection("users").findOne({"_id": o_id}, (err, result) => {
                if (err) print(err);
                else {
                    res.render(path.join(__dirname, '../../View/html', 'reset-pass.ejs'), {id: id});
                    
                    //else res.json({"message": "invalid page"});
                    db.close();
                }
            });
            
        });   
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

router.post('/reset-pass/:id', (req, res, next) => {
    try {
        const id = req.params.id;
        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            var ObjectId = require('mongodb').ObjectId; 
            var o_id = new ObjectId(id);
            dbo.collection("users").findOne({"_id": o_id}, (err, result) => {
                if (err) print(err);
                else {
                    bcrypt.genSalt(10, (err, salt) => {
                        if (err) throw err;
                        else {
                            bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                                if (err) throw err;
                                else {
                                    dbo.collection('users').updateOne({"email": result.email}, {$set: {"password": hashedPassword}}, (err, resUpdate) => {
                                        if (err) throw err;
                                        console.log("updated");  
                                        res.json({"message": "reset password successfully"});
                                        db.close();
                                    });
                                }
                            });
                        }
                    });
                    
                }
            });
            
        });   
    } catch (error) {
        res.send(error);
        console.log(error);
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
        res.redirect('/');
    });
})

module.exports = router;