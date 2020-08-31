const mongoose = require('mongoose');

const { Schema } = mongoose;

const bikeModel = new Schema({});

module.exports = mongoose.model('Bikes', bikeModel);
