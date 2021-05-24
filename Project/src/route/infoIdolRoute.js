const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const { strict } = require('assert');
const youtubeThumbnail = require('youtube-thumbnail');
var ObjectId = require('mongodb').ObjectId;

var Infos = {};

router.get('/info/:id', async(req, res, next) => {
    var idIDol = req.params.id;
    //console.log(idIDol);
        try {
            Infos = {};
            var temps = [];
            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol");
                
                dbo.collection("idols").find({ "_id": ObjectId(idIDol) }).toArray((err, result) => {
                    if (err) print(err);
                    else {
                        if (result.length > 0)
                        {
                            for(var i = 0; i<result[0].products.length; i++){
                                var temp = youtubeThumbnail(result[0].products[i].link).high.url;
                                temps.push(temp);
                            }
                            Infos['name'] = result[0].name;
                            Infos['description'] = result[0].description;
                            Infos['main_image'] = result[0].main_image;
                            Infos['sub_image'] = result[0].sub_image;
                            Infos['products'] = result[0].products;
                            Infos['products_images'] = temps;
                            Infos['contacts'] = result[0].contacts;
                            res.render(path.join(__dirname, '../../View/html', 'info.ejs'), { infos: Infos, session: {"loggedin": req.session.loggedin, "email": req.session.email} });
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

router.post('/info', async(req, res) => {
    var idIDol = req.params.id;
    var src = req.body.src;
    var email = req.session.email;
        try {
            Infos = {};
            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol"); 
                var newSrc = { "src": src, "email": email};

                dbo.collection("source").find(newSrc).toArray(function(err, result) {
                    if (err) throw err;
                    if(result.length > 0){
                        console.log("already has this pic in database");
                        res.end();
                    }else if(result.length == 0) {
                        dbo.collection("source").insertOne(newSrc, function(err, resInsert) {
                            if (err) throw err;
                            console.log("1 document inserted");      
                            res.end();                   
                        });
                    }
                    db.close();
                  });
            });   
        } catch (error) {
            res.send(error);
            console.log(error);
        }
})
module.exports = router;