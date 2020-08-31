const express = require('express');
const debug = require('debug')('app');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const { PORT } = process.env;

//const User = require('./src/models/userModel');

const db = mongoose.connect('mongodb://localhost/bikup');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('My server works');
});

app.listen(PORT, () => debug(`Server running on port ${PORT}`));

// Routes
const bikeRoutes = require('./src/routes/bikesRoutes')();

app.use('/api/bikes', bikeRoutes);
