const debug = require('debug')('app:bikeListRouterController');

function bikeListRouterController(UserModel, BikeModel, CompoModel) {
    let localBikeList = [];
    let tempBike = null;
    let localCompoList = [];

    async function loadBikeCompoList(bikeId) {
        const compoQuery = {
            compoBikeId: bikeId
        };

        await CompoModel.find(compoQuery, (error, compoList) => {
            if (error) {
                return null;
            } else {
                localCompoList = [...localCompoList, compoList];
            }
        });
    }

    async function get(req, res) {
        const bikeQuery = {
            bikeUserId: req.query.bikeUserId
        };

        if (req.query && req.query.bikeUserId) {
            await BikeModel.find(bikeQuery, (error, bikeList) => {
                if (error) {
                    res.status(400);
                    return res.send(
                        `Could not get bike list from DB: ${error}`
                    );
                } else {
                    localBikeList = bikeList;
                }
            });

            localBikeList.forEach((bike, index) => {
                (async function loadUniqueBike() {
                    await loadBikeCompoList(bike._id);
                    localBikeList.forEach((bike, index) => {
                        bike.bikeComponentList = localCompoList[index];
                    });

                    if (index === localBikeList.length - 1) {
                        debug('sending');
                        res.status(200);
                        return res.json(localBikeList[0]);
                    }
                })();
            });
        } else {
            res.status(400);
            return res.send('bikeUserId is required');
        }
    }

    return { get };
}

module.exports = bikeListRouterController;
