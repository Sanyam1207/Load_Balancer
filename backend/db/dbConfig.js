const mongoose = require('mongoose');

const mongo_url = "mongodb://localhost:27017/ServerHandler"

const dbconnect = () => {
    mongoose.connect(mongo_url).then(()=>{
        console.log("successfully connected to DB")
    }).catch((err)=>{
        console.log(err)
    })
}

module.exports = dbconnect