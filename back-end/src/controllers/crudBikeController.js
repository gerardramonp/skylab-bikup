const debug = require('debug')('app:crudBikeController');
const { ObjectID } = require('mongodb');
const { create } = require('../models/bikeModel');

function crudBikeController(UserModel, BikeModel, CompoModel) {
	async function createNewBike(bikeData) {
		// Create the bike properties
		const createQuery = {};
		Object.entries(bikeData).forEach((prop) => {
			createQuery[prop[0]] = prop[1];
		});

		// Insert bike to DB
		let createdBike = {};
		BikeModel.create(createQuery, (error, newBike) => {
			if (error) {
				return 'Error inserting the new bike';
			} else {
				createdBike = { ...newBike };
			}
		});

		// Insert that bike components


		return createdBike;
	}

	async function

	function post(req, res) {
		const { newBikeInfo } = req.body;
		const bikeUserId = req.body._id;

		const bikeQuery = {
			bikeName: newBikeInfo.bikeName,
		};
		BikeModel.findOne(bikeQuery, async (error, bike) => {
			if (error) {
				res.status(400);
				res.send('Error inserting the new bike');
			} else {
				if (bike) {
					res.status(409);
					debug('This bike already exists');
					return res.send('There is already a bike with this name');
				} else {
					const bikeData = { ...newBikeInfo, bikeUserId };

					const newBike = await createNewBike(bikeData);
					debug(`\n\nBIKE CREATED >>>>>>>> ${newBike}`);
				}
			}
		});
		// comprovar que la bici no existeix
		// Si existeix retornar missatge bike name already exist
		// Si no existeix crear bici i dir que ja existeix
	}

	return { post };
}

module.exports = crudBikeController;
