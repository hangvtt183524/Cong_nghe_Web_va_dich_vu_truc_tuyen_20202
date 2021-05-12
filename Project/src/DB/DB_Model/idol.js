const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient();

var url = 'mongodb://localhost:27017/DuIdol_Database';

mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    else {
        var users = db.collection('idol');
        var dataIdol = {
        }

        users.insertOne(dataIdol, (err, res) => {
            if (err) throw err;
            console.log("Da them mot user vao collection");
        });
    }
    db.close();
});