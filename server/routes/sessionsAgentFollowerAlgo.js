var express = require("express");
var router = express.Router();
const sessionsAgentFollowerAlgo_utils = require("./utils/sessionsAgentFollowerAlgo_utils");


router.get("/getSessionByUserId/:userId", async (req, res, next) => {
    try {
        const sessions_agent_follower_algo_user_details = await sessionsAgentFollowerAlgo_utils.getSessionByUserId(
            req.params.userId
        );
        console.log(sessions_agent_follower_algo_user_details)
        res.send(sessions_agent_follower_algo_user_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addNewSession/:user_session_id/:id/:agent_type/:score", async (req, res, next) => {
    try {
        const user_session_id = req.params.user_session_id
        const id = req.params.id
        const agent_type = req.params.agent_type
        const score = req.params.score
        await sessionsAgentFollowerAlgo_utils.addNewSession(user_session_id, id, agent_type, score);
        res.status(201).send("The addNewSession added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteSessionByUserSessionId/:UserSessionId", async (req, res, next) => {
    try {
        await sessionsAgentFollowerAlgo_utils.deleteSessionByUserSessionId(
            req.params.UserSessionId
        );
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;