const express = require('express');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const UserModel = require('./src/models/userModel');
const BikeModel = require('./src/models/bikeModel');
const CompoModel = require('./src/models/compoModel');

const app = express();
const { PORT } = process.env;

const db = mongoose.connect('mongodb://localhost/bikup');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('My server works');
});

app.listen(PORT, () => debug(`Server running on port ${PORT}`));

// Routes
const bikeRoutes = require('./src/routes/bikesRoutes')(
    UserModel,
    BikeModel,
    CompoModel
);

app.use('/api/bikes', bikeRoutes);
