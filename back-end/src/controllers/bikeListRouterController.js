const debug = require('debug')('app:bikeListRouterController');
const util = require('util');

function bikeListRouterController(UserModel, BikeModel, CompoModel) {
    let localBikeList = [];

    async function findUserBikes(userId) {
        const bikeQuery = {
            bikeUserId: userId
        };

        await BikeModel.find(bikeQuery, (error, bikeList) => {
            if (error) {
                debug(error);
                return error;
            } else {
                bikeList.forEach((bike, index) => {
                    const tempBike = { ...bike._doc };
                    localBikeList = [...localBikeList, tempBike];
                });
            }
        });
        return localBikeList;
    }

    async function findUserComponents(userId) {
        const compoQuery = {
            compoUserId: userId
        };

        let localCompoList = null;

        await CompoModel.find(compoQuery, (error, compoList) => {
            if (error) {
                debug(error);
                return error;
            } else {
                localCompoList = [...compoList];
            }
        });

        return localCompoList;
    }

    // ################## ROUTER PUBLIC METHODS ########################

    async function get(req, res) {
        let count = 0;
        let userBikeList = null;
        let userCompoList = null;

        userBikeList = await findUserBikes(req.query.bikeUserId);
        do {
            userCompoList = await findUserComponents(req.query.bikeUserId);
        } while (!userCompoList && count++ < 4);

        debug('\n\n__PARTICION__ \n\n');
        Promise.all([userBikeList, userCompoList]).then(
            ([bikeList, compoList]) => {
                bikeList = bikeList.reduce((acc, curr) => {
                    const bikeComponentList = compoList.filter((compo) => {
                        return compo.compoBikeId == curr._id;
                    });
                    const tempBike = { ...curr, bikeComponentList };

                    return [...acc, tempBike];
                }, []);

                res.status(200);
                return res.json(bikeList);
            }
        );
    }

    return { get };
}

module.exports = bikeListRouterController;
