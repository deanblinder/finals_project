var express = require("express");
var router = express.Router();
const session_agent_leader_utils = require("./utils/session_agent_leader_utils");




router.get("/getSessionByUserId/:userId", async (req, res, next) => {
    let session = [];
    try {
        const session_details = await session_agent_leader_utils.getSessionByUserId(
            req.params.userId
        );
        console.log(session_details)
        res.send(session_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addSession/:user_session_id/:id/:agent_type/:score", async (req, res, next) => {
    try {
        const user_session_id = req.params.user_session_id
        const id = req.params.id
        const agent_type = req.params.agent_type
        const score = req.params.score
        await session_agent_leader_utils.addSession(user_session_id, id, agent_type, score);
        res.status(201).send("The Session added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteSessionByUserSessionId/:userId", async (req, res, next) => {
    try {
        await session_agent_leader_utils.deleteSessionByUserSessionId(
            req.params.userId
        );
        res.status(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;