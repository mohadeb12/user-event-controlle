const mongoose = require('mongoose');

const eventSchema = mongoose.Schema({
    name : {type : String, required : true},
    description : {type : String, required : true},
    date : {type : Date, required : true},
    place : {type : String, required : true},
    owner: {    
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
},{timestamps : true});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;