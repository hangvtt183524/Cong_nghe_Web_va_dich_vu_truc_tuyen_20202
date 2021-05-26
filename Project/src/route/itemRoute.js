const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const { strict } = require('assert');
var ObjectId = require('mongodb').ObjectId;

var Items = []

router.get('/items', async(req, res, next) => {
    var categorical = req.query.categorical;
    var item = req.query.item;
    Items = [];

    if (Array.isArray(categorical)) res.send("Something is wrong");
    if (categorical != undefined) {
        categorical = categorical.replace(/^"(.+(?="$))"$/, '$1');
        categorical = categorical.replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
    
    if (Array.isArray(item)) res.send("Something is wrong");
    if (item != undefined) {
        item = item.replace(/^"(.+(?="$))"$/, '$1');
        item = item.replace(/^["'](.+(?=["']$))["']$/, '$1');
    }
    

    if (categorical != undefined) {
        try {
            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol");
                
                dbo.collection("items").find({ "categorical":  categorical}).toArray((err, result) => {
                    if (err) print(err);
                    else {
                        if (result.length > 0)
                        {
                            var lengthResult = result.length;
                            for (var i = 0; i<lengthResult; i++) {
                                var itemInPage = {"image": result[i].image, "name": result[i].name, "link": result[i].link};
                                Items.push(itemInPage);
                            }
                            res.render(path.join(__dirname, '../../View/html', 'item.ejs'), { items: Items, session: {"email": req.session.email} });
                        } 
                    }
                    db.close();
                });  
            });   
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }
    else if (item != undefined) {
        try {
            nameSplit = item.toLowerCase().split(' ');
            var nameCapitalize = '';
            for (var i=0; i<nameSplit.length; i++) {
                var name = nameSplit[i];
                name = name.charAt(0).toUpperCase() + name.slice(1);
                nameCapitalize = nameCapitalize + " " + name;
            }
            nameCapitalize = nameCapitalize.slice(1);

            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol");
                
                dbo.collection("items").find({ $or : [
                    { "name" : { "$regex":  ".*" + item + ".*"}},
                    { "name" : { "$regex":  ".*" + item.toUpperCase() + ".*"}},
                    { "name" : { "$regex":  ".*" + item.toLowerCase() + ".*"}},
                    { "name" : { "$regex":  ".*" + nameCapitalize + ".*"}},
                    { "ref" : { "$regex": ".*" + item + ".*"}},
                    { "ref" : { "$regex": ".*" + item.toUpperCase() + ".*"}},
                    { "ref" : { "$regex": ".*" + item.toLowerCase() + ".*"}},
                    { "ref" : { "$regex": ".*" + nameCapitalize + ".*"}},
                    { "categorical" : { "$regex": ".*" + item + ".*"}},
                    { "categorical" : { "$regex": ".*" + item.toUpperCase() + ".*"}},
                    { "categorical" : { "$regex": ".*" + item.toLowerCase() + ".*"}},
                    { "categorical" : { "$regex": ".*" + nameCapitalize + ".*"}}
                ]}).toArray((err, result) => {
                    if (err) print(err);
                    else {
                        if (result.length > 0)
                        {
                            var lengthResult = result.length;
                            for (var i = 0; i<lengthResult; i++) {
                                var itemInPage = {"image": result[i].image, "name": result[i].name, "link": result[i].link};
                                Items.push(itemInPage);
                            }
                            res.render(path.join(__dirname, '../../View/html', 'item.ejs'), { items: Items, session: {"email": req.session.email} });
                        }
                        else  res.render(path.join(__dirname, '../../View/html', 'item.ejs'), { session: {"email": req.session.email}, items: [] });
                    }
                    db.close();
                });  
            });   
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }
        
})

module.exports = router;