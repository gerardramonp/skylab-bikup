const debug = require('debug')('app:crudBikeController');
const { ObjectID } = require('mongodb');
const { filter } = require('../Constants/bikeDefaultComponents');
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

	function createBike(req, res) {
		debug('entro al bike');
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

	function deleteBike(req, res) {
		const { bikeId } = req.body;

		const bikeQuery = {
			_id: new ObjectID(bikeId),
		};

		const compoQuery = {
			compoBikeId: bikeId,
		};

		BikeModel.deleteOne(bikeQuery, (error, deletedBike) => {
			if (error) {
				debug(error);
				return res.send(false);
			} else {
				debug('Bike deleted, deleting components....');
				debug(deletedBike);
				CompoModel.deleteMany(compoQuery, (error, deletedCompos) => {
					if (error) {
						debug(error);
						return res.send(false);
					} else {
						debug('\n\nComponents deleted:' + deletedCompos);
						return res.send(true);
					}
				});
			}
		});
	}

	function updateBike(req, res) {
		const { bikeInfo, bikeId, isNameChanged } = req.body;

		const filterQuery = {
			_id: new ObjectID(bikeId),
		};

		const updateQuery = {};
		Object.entries(bikeInfo).forEach((prop) => {
			updateQuery[prop[0]] = prop[1];
		});

		debug(updateQuery);
		// If bikeName is not modified, update it
		if (!isNameChanged) {
			BikeModel.updateOne(
				filterQuery,
				updateQuery,
				(error, updateStatus) => {
					if (error) {
						debug(error);
						res.status(400);
						res.send(false);
					} else {
						res.status(200);
						return res.send(true);
					}
				}
			);
		} else {
			// BikeName is being modified, check if that name exist frist

			const bikeNameQuery = {
				bikeName: bikeInfo.bikeName,
			};
			BikeModel.findOne(bikeNameQuery, (error, foundBike) => {
				if (error) {
					debug(error);
					res.status(400);
					res.send(false);
				} else {
					debug(foundBike);
					if (foundBike) {
						res.status(304);
						res.send(false);
					} else {
						// Bike name is avaliable, update it
						BikeModel.updateOne(
							filterQuery,
							updateQuery,
							(error, updateStatus) => {
								if (error) {
									debug(error);
									res.status(400);
									res.send(false);
								} else {
									res.status(200);
									return res.send(true);
								}
							}
						);
					}
				}
			});
		}
	}

	function addWorkout(req, res) {
		debug('Starting workout proces....');
		const { bikeInfo, bikeId, workoutInfo } = req.body;

		const filterQuery = {
			_id: new ObjectID(bikeId),
		};

		const updateBikeQuery = {};
		Object.entries(bikeInfo).forEach((prop) => {
			updateBikeQuery[prop[0]] = prop[1];
		});

		BikeModel.updateOne(
			filterQuery,
			updateBikeQuery,
			(error, updateStatus) => {
				if (error) {
					res.status(304);
					res.send(false);
				} else {
					const compoFilterQuery = {
						compoBikeId: bikeId,
					};

					const updateComposQuery = {
						$inc: {
							compoAccumulatedMeters: workoutInfo.workoutMeters,
							compoAccumulatedMinutes:
								workoutInfo.workoutTotalMinutes,
						},
					};

					debug(updateComposQuery);

					CompoModel.updateMany(
						compoFilterQuery,
						updateComposQuery,
						(error, updateStatus) => {
							if (error) {
								debug(error);
								res.status(304);
								res.send(false);
							} else {
								debug('Compos updated.....');
								debug(updateStatus);

								res.status(200);
								return res.send(true);
							}
						}
					);
				}
			}
		);
	}

	return { createBike, deleteBike, updateBike, addWorkout };
}

module.exports = crudBikeController;
