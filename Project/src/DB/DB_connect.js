const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/DuIdol_Database", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('DB connected');
}).catch((err) => {
    console.log('no connection');
})