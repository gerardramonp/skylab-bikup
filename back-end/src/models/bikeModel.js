const mongoose = require('mongoose');

const { Schema } = mongoose;

const bikeModel = new Schema({
    userId: { type: String },
    bikeName: { type: String },
    bikeType: { type: String },
    driveStyle: { type: String },
    bikeBrand: { type: String },
    bikeModel: { type: String },
    bikeName: { type: String },
    totalMeters: { type: Number },
    totalMinutes: { type: Number },
    likes: { type: Number },
    components: [
        {
            name: { type: String },
            life: { type: Number },
            accumulatedMeters: { type: Number },
            accumulatedMinutes: { type: Number }
        }
    ]
});

module.exports = mongoose.model('Bikes', bikeModel);
