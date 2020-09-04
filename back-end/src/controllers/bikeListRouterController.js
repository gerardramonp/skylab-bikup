const debug = require('debug')('app:bikeListRouterController');

function bikeListRouterController(UserModel, BikeModel, CompoModel) {
    let localBikeList = [];
    let finalBikeList = [];
    let tempBike = null;
    let localCompoList = [];
    let correspondingCompo = null;

    function resetState() {
        localBikeList = [];
        localBikeList = [];
        finalBikeList = [];
        tempBike = null;
        localCompoList = [];
        correspondingCompo = null;
    }

    async function loadBikeCompoList(bikeId) {
        const compoQuery = {
            compoBikeId: bikeId
        };

        await CompoModel.find(compoQuery, (error, compoList) => {
            if (error) {
                debug(error);
                return null;
            } else {
                localCompoList = [...localCompoList, compoList];
            }
        });
        debug(`Found ${localCompoList.length} components`);
    }

    async function get(req, res) {
        resetState();
        const bikeQuery = {
            bikeUserId: req.query.bikeUserId
        };

        if (req.query && req.query.bikeUserId) {
            await BikeModel.find(bikeQuery, (error, bikeList) => {
                if (error) {
                    debug(error);
                    res.status(400);
                    return res.send(
                        `Could not get bike list from DB: ${error}`
                    );
                } else {
                    bikeList.forEach((bike, index) => {
                        //debug(`foreach vuelta ${index + 1}`);
                        tempBike = { ...bike._doc };
                        localBikeList = [...localBikeList, tempBike];
                    });
                }
            });

            debug(`Found ${localBikeList.length} bikes`);

            localBikeList.forEach((bike, index) => {
                (async function loadUniqueBike() {
                    await loadBikeCompoList(bike._id);

                    // debug(
                    //     `checking bike ${bike._id} iterating ${localCompoList.length} compos`
                    // );

                    let correspondingIndex = 0;
                    localCompoList.forEach((bikeCompos, index) => {
                        correspondingCompo = bikeCompos.find(
                            (compo) => compo.compoBikeId == bike._id
                        );
                        if (correspondingCompo) {
                            correspondingIndex = index;
                        }

                        // debug(
                        //     `found this compo: ${correspondingCompo} at index ${index}`
                        // );
                    });

                    bike.bikeComponentList = localCompoList[correspondingIndex];
                    finalBikeList = [...finalBikeList, bike];

                    if (index === localBikeList.length - 1) {
                        // debug(
                        //     `sending bike list with compos (${finalBikeList.length})...`
                        // );
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
