var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const users_utils = require("./utils/users_utils");


/**
 * Authenticate all incoming requests by middleware
 */
// router.use(async function (req, res, next) {
//     if (req.session && req.session.user_id) {
//         DButils.execQuery("SELECT user_id FROM Users")
//             .then((users) => {
//                 if (users.find((x) => x.user_id === req.session.user_id)) {
//                     req.user_id = req.session.user_id;
//                     next();
//                 }
//             })
//             .catch((err) => next(err));
//     } else {
//         res.sendStatus(401);
//     }
// });


router.get("/getUserById/:userId", async (req, res, next) => {
    let users = [];
    try {
        const user_details = await users_utils.getUserById(
            req.params.userId
        );
        //we should keep implementing team page.....
        console.log(user_details)
        res.send(users).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addUser/:mail/:age/:gender/:model/:version", async (req, res, next) => {
    try {
        const mail = req.params.mail
        const age = req.params.age
        const gender = req.params.gender
        const model = req.params.model
        const version = req.params.version
        console.log("in router.post: before adding")
        await users_utils.addUser('1',mail, age, gender, model, version);
        console.log("in router.post: after adding")
        res.status(201).send("The User added");
    } catch (error) {
        next(error);
    }
});



module.exports = router;