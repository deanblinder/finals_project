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

router.get("/numberOfExistingMails/:mail", async (req, res, next) => {
    try {
        console.log("---in numberOfExistingMails ---")
        const users_mail = await users_utils.getUserIdByEmail(
            req.params.mail.split('$')[0]
        );
        console.log("users_mail: ", (users_mail.length).toString())
        res.status(200).send((users_mail.length).toString());
    } catch (error) {
        next(error);
    }
});


router.post("/addUser/:mail/:age/:gender/:version", async (req, res, next) => {
    try {
        //id = uuid
        console.log('---in addUser---')
        const mail = req.params.mail
        const age = req.params.age
        const gender = req.params.gender
        const version = 1
        await users_utils.addUser(mail, age, gender, version);
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