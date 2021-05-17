const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const { strict } = require('assert');

const idol = new Object();

router.get('/idol_list/:page', async(req, res, next) => {
    var page = req.params.page;
    //console.log("page: " + page);
    try {
        MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
            if (err) throw err;
            var dbo = db.db("duidol");
            
            dbo.collection("idols").find({}).toArray((err, result) => {
                if (err) print(err);
                else {
                    //console.log(result);
                    for (var i=6*(page-1); i<6*page; i++) {
                        console.log(result[i]._id);
                        idol['id' + (i+1)] = result[i]._id;
                        idol['name' + (i+1)] = result[i].name;
                        idol['image' + (i+1)] = result[i].image_list; 
                    }
                    res.render(path.join(__dirname, '../../View/html', 'idol_list.ejs'), { idol });
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