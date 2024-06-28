const mongoose = require('mongoose');

const Local_URL ='mongodb://127.0.0.1:27017/grievanceportal'

const connectDb =()=>{
    return mongoose.connect(Local_URL)
    .then(()=>{
        console.log("connect successfully")
    }).catch((error)=>{
        console.log(error)
    })
}

module.exports =connectDb