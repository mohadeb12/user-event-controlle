const mongoose = require('mongoose');
const {MONGO_URI} = require('./envConfig');


const connectdb = async () =>{
    try{
        await mongoose.connect(MONGO_URI);
        console.log('Database connect is successfull')
    }catch(err){
        console.log('Database connection failed : ', err.message)
    };
};

module.exports = connectdb;