const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient();


var url = 'mongodb://localhost:27017/duidol';

mongoClient.connect(url, (err, db) => {
    if (err) throw err;
    else {
        console.log('Successful to connect MongoDB');

        db.createCollection('users', (err, res) => {
            if (err) throw err;
            else {
                console.log("Tao thanh cong collection user");
            }
        });

        db.createCollection('idols', (err, res) => {
            if (err) throw err;
            else {
                console.log("Tao thanh cong collection idol");
            }
        });
        // Thuc hien cac query den db truoc khi dong ket noi
        db.close();
        console.log("Closed DB");
    }
    
});
