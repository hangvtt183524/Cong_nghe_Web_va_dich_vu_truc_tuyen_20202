const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const { strict } = require('assert');
var ObjectId = require('mongodb').ObjectId;

var Infos = {};

router.get('/info/:id', async(req, res, next) => {
    var idIDol = req.params.id;
    //console.log(idIDol);
        try {
            Infos = {};
            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol");
                
                dbo.collection("idols").find({ "_id": ObjectId(idIDol) }).toArray((err, result) => {
                    if (err) print(err);
                    else {
                        if (result.length > 0)
                        {
                            Infos['name'] = result[0].name;
                            Infos['description'] = result[0].description;
                            Infos['main_image'] = result[0].main_image;
                            Infos['sub_image'] = result[0].sub_image;
                            Infos['products'] = result[0].products;
                            Infos['contacts'] = result[0].contacts;
                        
                            res.render(path.join(__dirname, '../../View/html', 'info.ejs'), { infos: Infos });
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

module.exports = router;