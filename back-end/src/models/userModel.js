const mongoose = require('mongoose');

const { Schema } = mongoose;

const userModel = new Schema({
    email: { type: String },
    password: { type: String },
    username: { type: String }
});

module.exports = mongoose.model('Users', userModel);
