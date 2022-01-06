var express = require("express");
var router = express.Router();
const users_utils = require("./utils/users_utils");



router.get("/getUserById/:userId", async (req, res, next) => {
    let users = [];
    try {
        const user_details = await users_utils.getUserById(
            req.params.userId
        );
        //we should keep implementing team page.....
        console.log(user_details)
        users.push(users_utils)
        res.send(users).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getUserByEmail/:email", async (req, res, next) => {
    let users = [];
    try {
        const user_details = await users_utils.getUserByEmail(
            req.params.email
        );
        //we should keep implementing team page.....
        console.log(user_details)
        users.push(users_utils)
        res.send(users).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getUserIdByUUID/:uuid", async (req, res, next) => {
    let users = [];
    try {
        const user_details = await users_utils.getUserIdByUUID(
            req.params.uuid
        );
        //we should keep implementing team page.....
        console.log(user_details)
        users.push(user_details)
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

router.delete("/deleteUserByEmail/:email", async (req, res, next) => {

    try {
         await users_utils.deleteUserByEmail(
            req.params.email
        );
        //we should keep implementing team page.....
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;