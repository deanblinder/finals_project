
var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils.js");
const players_utils = require("./utils/players_utils");
const teams_utils = require("./utils/teams_utils")
const game_utils = require ("./utils/game_utils");

/**
 * Authenticate all incoming requests by middleware
 */
router.use(async function (req, res, next) {
    if (req.session && req.session.user_id) {
        DButils.execQuery("SELECT user_id FROM Users")
            .then((users) => {
                if (users.find((x) => x.user_id === req.session.user_id)) {
                    req.user_id = req.session.user_id;
                    next();
                }
            })
            .catch((err) => next(err));
    } else {
        res.sendStatus(401);
    }
});
