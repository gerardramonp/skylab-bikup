const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
    email: { type: String },
    password: { type: String },
    username: { type: String },
    signUpDate: { type: Date, default: Date.now },
    profilePicture: { type: String },
    stravaUserId: { type: String },
    stravaAccessToken: { type: String },
    stravaRefreshToken: { type: String },
    stravaTokenExpire: { type: Number },
    stravaLastRoute: { type: Date }
});

module.exports = mongoose.model('Users', userModel);
