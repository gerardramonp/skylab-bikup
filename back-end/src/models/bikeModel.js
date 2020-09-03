const mongoose = require('mongoose');

const { Schema } = mongoose;

const bikeModel = new Schema({
    bikeUserId: { type: String },
    bikeName: { type: String },
    bikeType: { type: String },
    bikeDriveStyle: { type: String },
    bikeBrand: { type: String },
    bikeModel: { type: String },
    bikeName: { type: String },
    bikeTotalMeters: { type: Number },
    bikeTotalMinutes: { type: Number },
    bikeLikes: { type: Number }
});

module.exports = mongoose.model('Bikes', bikeModel);
