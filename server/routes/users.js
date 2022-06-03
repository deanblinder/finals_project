var express = require("express");
var router = express.Router();
const users_utils = require("./utils/users_utils");



// router.get("/getUserById", async (req, res, next) => {
//     try {
//         const user_details = await users_utils.getUserById();
//         console.log(user_details)
//         res.send(user_details).status(200);
//     } catch (error) {
//         next(error);
//     }
// });

// router.get("/getUserByEmail/:email", async (req, res, next) => {
//     try {
//         const user_details = await users_utils.getUserByEmail(
//             req.params.email
//         );
//         console.log(user_details)
//         res.send(user_details).status(200);
//     } catch (error) {
//         next(error);
//     }
// });

router.get("/getUserIdByUUID/:uuid", async (req, res, next) => {
    try {
        const user_details = await users_utils.getUserIdByModel(
            req.params.uuid
        );
        console.log(user_details)
        res.send(user_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/isUserModelExists/:uuid", async (req, res, next) => {
    try {
        const users_id = await users_utils.getUserIdByModel(
            req.params.uuid
        );
        console.log(users_id)
        var to_send = []
        if(users_id > 0){
            const len = length(users_id)
            if(users_id[len-2] === '/'){
                to_send = [true,users_id[len-1]]
            }
            else{  // there is only one model in the DB
                to_send = [true,0]
            }
        }
        else{
            // the model isn't in the DB
            to_send = [false,0]
        }
        res.send(to_send).status(200);
    } catch (error) {
        next(error);
    }
});


router.post("/addUser/:mail/:age/:gender/:deviceUid/:version", async (req, res, next) => {
    try {
        //id = uuid
        console.log('---in addUser---')
        const mail = req.params.mail
        const age = req.params.age
        const gender = req.params.gender
        const model = req.params.deviceUid
        const version = 1
        await users_utils.addUser(mail, age, gender, model, version);
        console.log("after added addUser")
        res.status(200).send("The User added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteUserByEmail/:email", async (req, res, next) => {
    try {
        console.log('---in deleteUserByEmail---')
        await users_utils.deleteUserByEmail(
            req.params.email
        );
        console.log("after deleteUserByEmail")
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;