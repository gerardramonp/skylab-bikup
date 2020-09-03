const debug = require('debug')('app:bikeListRouterController');

function bikeListRouterController(UserModel, BikeModel, CompoModel) {
    let localBikeList = [];
    let finalBikeList = [];
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
                    bikeList.forEach((bike) => {
                        tempBike = { ...bike._doc };
                        localBikeList = [...localBikeList, tempBike];
                        debug(`localbikelist length: ${localBikeList.length}`);
                    });
                }
            });

            localBikeList.forEach((bike, index) => {
                (async function loadUniqueBike() {
                    await loadBikeCompoList(bike._id);

                    // Les bicis arriben pero els compos estan invertits, s'ha de mirar que posi els compos de la bici que tingui el mateix id
                    bike.bikeComponentList = localCompoList[index];
                    finalBikeList = [...finalBikeList, bike];
                    debug(
                        `amb bici ${bike.bikeName}: lenght ${finalBikeList.length}`
                    );

                    if (index === localBikeList.length - 1) {
                        debug('sending');
                        res.status(200);
                        return res.json(finalBikeList);
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
