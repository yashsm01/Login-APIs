const mongoose = require("mongoose");
 
const Users = mongoose.Schema({
    Name: {type:String,required: true},
    Email: {type :String, required:true},
    Password: { type : String, required: true},
    Image:{type:String,require:true},
    BirthDate:{type:Date,require:true}
},
{timestamps: true});

module.exports = mongoose.model('Employee',Users);
