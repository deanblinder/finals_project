var express = require("express");
var router = express.Router();
const actions_utils = require("./utils/actions_utils");




router.get("/getActionByUserId/:userId", async (req, res, next) => {
    let action = [];
    try {
        const action_details = await actions_utils.getActionByUserId(
            req.params.userId
        );
        console.log(action_details)
        action.push(action_details)
        res.send(action).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addAction/:userSessionId/:sessionId/:actionOwner/:timePress", async (req, res, next) => {
    try {
        const userSessionId = req.params.userSessionId
        const sessionId = req.params.sessionId
        const actionOwner = req.params.actionOwner
        const timePress = req.params.timePress
        // const timePress2 = new Date(timePress)
        await actions_utils.addAction(userSessionId,sessionId, actionOwner,timePress);
        res.status(201).send("The addAction added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteActionByUserSessionId/:UserSessionId", async (req, res, next) => {
    try {
        await actions_utils.deleteActionByUserSessionId(
            req.params.UserSessionId
        );
        //we should keep implementing team page.....
        res.status(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;