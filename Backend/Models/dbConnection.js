const mongoose = require('mongoose')
const DBurl = `${process.env.MONGO_CONN}/NearBuy`
mongoose.connect(DBurl).then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.log(err);
    });