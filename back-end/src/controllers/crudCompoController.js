const debug = require('debug')('app:crudCompoController');
const { ObjectID } = require('mongodb');

const defaultCompos = require('../Constants/bikeDefaultComponents');

function debugObject(object) {
	Object.entries(object).forEach((prop) => {
		debug(prop);
	});
}

function checkCompoDisplayName(compoType) {
	let result = defaultCompos.find((compo) => {
		return compo.compoType === compoType;
	});

	return result.compoDisplayName;
}

function crudBikeController(BikeModel, CompoModel) {
	// Private functions
	function createCompo(req, res) {
		const { compoInfo, userId, bikeId } = req.body;
		const compoQuery = {};
		Object.entries(compoInfo).forEach((prop) => {
			compoQuery[prop[0]] = prop[1];
		});
		compoQuery.compoBikeId = bikeId;
		compoQuery.compoUserId = userId;
		compoQuery.compoDisplayName = checkCompoDisplayName(
			compoInfo.compoType
		);

		CompoModel.create(compoQuery, (error, createdCompo) => {
			if (error) {
				res.status(400);
				res.send(false);
			} else {
				res.status(201);
				return res.json(createdCompo);
			}
		});
	}

	function resetCompo(req, res) {
		const { compoId } = req.body;

		CompoModel.findById(compoId, (error, compo) => {
			if (error) {
				res.status(304);
				res.send(false);
			} else {
				compo.compoAccumulatedMeters = 0;
				compo.compoAccumulatedMinutes = 0;
				compo.save((error, savedStatus) => {
					if (error) {
						res.status(304);
						res.send(false);
					} else {
						debug(savedStatus);
						res.status(200);
						res.send(true);
					}
				});
			}
		});
	}

	return { createCompo, resetCompo };
}

module.exports = crudBikeController;
