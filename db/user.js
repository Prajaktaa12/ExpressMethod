let mongoose = require("mongoose");       //INITIALIZING MONGOOSE

//CREATING SCHEMA
let userSchema = new mongoose.Schema({
    firstname: { type: String, min: 4, max: 100, required: true },
    lastname: { type: String, min: 4, max: 200, required: true },
    Address: { 
        Country: { type: String, min: 4, max: 100, required: true },
        city: { type: String, min: 4, max: 100, required: true },
        state: { type: String, min: 4, max: 100, required: true }
    },
    Gender:{ type: String, min: 4, max: 100, required: true},
    UserLogin: {
        emailId: { type: String, required: true, unique:true },
        password: { type: String, required: true }
    }
});

//CREATING MODEL
let userModel = mongoose.model("userDetails", userSchema);
//EXPORTING MODEL
module.exports = userModel;