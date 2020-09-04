const mongoose = require('mongoose');

const { Schema } = require('mongoose');

const compoModel = new Schema({
    compoUserId: { type: String },
    compoBikeId: { type: String },
    compoType: { type: String },
    compoDisplayName: { type: String },
    compoLife: { type: Number },
    compoAccumulatedMeters: { type: Number },
    compoAccumulatedMinutes: { type: Number }
});

module.exports = mongoose.model('Components', compoModel);
