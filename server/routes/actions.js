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

router.post("/addAction/:userId/:actionOwner/:pressTimeArr", async (req, res, next) => {
    try {
        console.log("*** addAction ***")
        const userSessionId = req.params.userId
        // const sessionId = req.params.sessionId
        const actionOwner = req.params.actionOwner
        const  pressTimeArr = [req.params.pressTimeArr]
        // const sessionId = actions_utils.getSessionIdByUserId(userSessionId);
        const sessionId = 1  //temp
        await actions_utils.addAction(userSessionId,sessionId, actionOwner,pressTimeArr);
        res.status(200).send("The addAction added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteActionByUserSessionId/:userId", async (req, res, next) => {
    try {
        await actions_utils.deleteSessionByUserSessionId(
            req.params.userId
        );
        //we should keep implementing team page.....
        res.status(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;