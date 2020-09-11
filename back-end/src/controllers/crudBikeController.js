const debug = require('debug')('app:crudBikeController');
const { ObjectID } = require('mongodb');
const defaultCompoList = require('../Constants/bikeDefaultComponents');

function debugObject(object) {
	Object.entries(object).forEach((prop) => {
		debug(prop);
	});
}

function crudBikeController(UserModel, BikeModel, CompoModel) {
	// Private functions

	function setComponentListInfo(compos, userId, bikeId) {
		const compoReducer = (accumulator, current) => {
			current.compoUserId = userId;
			current.compoBikeId = bikeId;
			return [...accumulator, current];
		};

		return compos.reduce(compoReducer, []);
	}

	async function createNewBikeWithCompos(bikeData) {
		// Create the bike properties
		const createQuery = {};
		Object.entries(bikeData).forEach((prop) => {
			createQuery[prop[0]] = prop[1];
		});

		// Insert bike to DB
		BikeModel.create(createQuery, (error, newBike) => {
			if (error) {
				throw new Error(
					'There has been an error while creating your bike'
				);
			} else {
				const readyCompoList = setComponentListInfo(
					defaultCompoList,
					bikeData.bikeUserId,
					newBike._id
				);

				CompoModel.create(readyCompoList, (error, createdCompoList) => {
					if (error) {
						throw new Error(
							'There has been an error while an error creating your bike components'
						);
					} else {
						return { newBike, createdCompoList };
					}
				});
			}
		});
	}

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
					return res.send(false);
				} else {
					const bikeData = { ...newBikeInfo, bikeUserId };
					try {
						const newBike = await createNewBikeWithCompos(bikeData);
						res.status(201);
						return res.send(true);
					} catch (error) {
						res.status(400);
						return res.send(false);
					}
				}
			}
		});
	}

	return { post };
}

module.exports = crudBikeController;
