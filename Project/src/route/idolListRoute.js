const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const { strict } = require('assert');

const idols = [];

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
                        //console.log(result[i]._id);
                        var elementInPage = {"id": result[i]._id, "name": result[i].name, "image": result[i].image_list};
                        idols.push(elementInPage);
                    }
                    res.render(path.join(__dirname, '../../View/html', 'idol_list.ejs'), { idols: idols });
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