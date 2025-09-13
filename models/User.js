require('dotenv').config();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

UserSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id, name: this.name, email: this.email}, process.env.JWT_SECRET, { expiresIn: "1d"});
    return token;
}




module.exports = mongoose.model('"User', UserSchema);