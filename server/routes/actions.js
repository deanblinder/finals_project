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

router.post("/addAction/:user_session_id/:user_press_time/:agent_press_time/:experiment_info", async (req, res, next) => {
    try {
        console.log("in router addAction")
        const user_session_id = req.params.user_session_id
        // const sessionId = req.params.sessionId
        const user_press_time = req.params.user_press_time
        const  agent_press_time = req.params.agent_press_time
        const  experiment_info = req.params.experiment_info

        // const timePress = new Date(req.params.timePress)
        // const timeRelese = new Date(req.params.timeRelese)
        // const sessionId = actions_utils.getSessionIdByUserId(userSessionId);
        await actions_utils.addAction(user_session_id, user_press_time,agent_press_time,experiment_info);
        console.log("after addAction")
        res.status(201).send("The addAction added");
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