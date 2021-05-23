const express = require('express');
const router = express.Router();
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

router.get('/myaccount', (req, res) => {
    savedImg = [];
    try {
        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            dbo.collection("source").find({"email": req.session.email}).toArray((err, result) => {
                if (err) print(err);
                else {                   
                    for (var i=0; i<result.length; i++) {
                        var temp = {"src": result[i].src};
                        savedImg.push(temp);
                    }
                    console.log(savedImg);
                    res.render(path.join(__dirname, '../../View/html', 'acc.ejs'), { savedImg: savedImg, session: {"loggedin": req.session.loggedin, "email": req.session.email} });                   
                }
                db.close();
            });  
        });   
    } catch (error) {
        res.send(error);
        console.log(error);
    }
    });

module.exports = router;