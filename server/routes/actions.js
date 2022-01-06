var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const actions_utils = require("./utils/actions_utils");




router.get("/getActionByUserId/:userId", async (req, res, next) => {
    let action = [];
    try {
        const action_details = await actions_utils.getActionByUserId(
            req.params.userId
        );
        console.log(session_details)
        res.send(action).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addAction/:userSessionId/:sessionId/:actionOwner/:timePress/:timeRelese", async (req, res, next) => {
    try {
        const userSessionId = req.params.userSessionId
        const sessionId = req.params.sessionId
        const actionOwner = req.params.actionOwner
        const timePress = req.params.timePress
        const timeRelese = req.params.timeRelese


        console.log("in router.post: before adding")
        await actions_utils.addAction(userSessionId,sessionId, actionOwner,timePress, timeRelese);
        console.log("in router.post: after adding")
        res.status(201).send("The Session added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteActionByUserSessionId/:userId", async (req, res, next) => {
    let users = [];
    try {
        await actions_utils.deleteSessionByUserSessionId(
            req.params.userId
        );
        //we should keep implementing team page.....
        res.send(users).status(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;