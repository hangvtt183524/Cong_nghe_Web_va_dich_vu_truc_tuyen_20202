const express = require('express');
const router = express.Router();
const path = require('path');
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const { strict } = require('assert');

var idols = [];

router.get('/idol_list', async(req, res, next) => {
    var page = req.query.page;
    var nameIdol = req.query.name;
    //console.log("page: " + page);
    if (page != undefined) {
        page = parseInt(page);
        try {
            idols = [];
            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol");
                
                dbo.collection("idols").find({}).toArray((err, result) => {
                    if (err) print(err);
                    else {
                        //console.log(result);
                        for (var i=6*(page-1); i<6*page; i++) {
                            //console.log(result[i]._id);
                            if (result[i] == undefined) {
                                break;
                            }
                            //console.log(result[i]._id);
                            var elementInPage = {"id": result[i]._id, "name": result[i].name, "image": result[i].image_list};
                            idols.push(elementInPage);
                        }
                        res.render(path.join(__dirname, '../../View/html', 'idol_list.ejs'), { idols: idols, session: {"loggedin": req.session.loggedin, "email": req.session.email}});
                        
                    }
                    db.close();
                });  
            });   
        } catch (error) {
            res.send(error);
            console.log(error);
        }
    }
    else if (nameIdol != undefined) {
        try {
            nameSplit = nameIdol.toLowerCase().split(' ');
            var nameCapitalize = '';
            for (var i=0; i<nameSplit.length; i++) {
                var name = nameSplit[i];
                name = name.charAt(0).toUpperCase() + name.slice(1);
                nameCapitalize = nameCapitalize + " " + name;
            }
            nameCapitalize = nameCapitalize.slice(1);
            //console.log(nameCapitalize);
            idols = [];
            MongoClient.connect('mongodb://localhost:27017/', (err, db) => {
                if (err) throw err;
                var dbo = db.db("duidol");
                //console.log("name1: " + nameIdol);
                dbo.collection("idols").find({ $or : [
                    { "name" : { "$regex":  ".*" + nameIdol + ".*"}},
                    { "name" : { "$regex":  ".*" + nameIdol.toUpperCase() + ".*"}},
                    { "name" : { "$regex":  ".*" + nameIdol.toLowerCase() + ".*"}},
                    { "name" : { "$regex":  ".*" + nameCapitalize + ".*"}}
                ]}).toArray((err, result) => {
                    if (err) print(err);
                    else {
                        if (result.length > 0) {
                            var lengthResult = result.length;
                            //console.log(lengthResult);
                            for (var i = 0; i<lengthResult; i++) {
                                var elementInPage = {"id": result[i]._id, "name": result[i].name, "image": result[i].image_list};
                                idols.push(elementInPage);
                            }
                            res.render(path.join(__dirname, '../../View/html', 'idol_list.ejs'), { idols: idols, session: {"loggedin": req.session.loggedin, "email": req.session.email} });
                        }
                        else {
                            console.log("name: " + nameIdol);
                            console.log(result.length);
                            res.render(path.join(__dirname, '../../View/html', 'idol_list.ejs'), { idols: idols, session: {"loggedin": req.session.loggedin, "email": req.session.email}});
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
})



module.exports = router;