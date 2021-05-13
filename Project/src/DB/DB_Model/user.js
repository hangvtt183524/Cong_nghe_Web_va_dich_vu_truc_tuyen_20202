const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient();

var url = 'mongodb://localhost:27017/DuIdol_Database';

mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    else {
        var users = db.collection('user');
        var dataUser = {
            userName: "JoongNine",
            password: "1234567890",
            email: "joongnine@gmail.com"
        }

        users.insertOne(dataUser, (err, res) => {
            if (err) throw err;
            console.log("Da them mot user vao collection");
        });
    }
    db.close();
});