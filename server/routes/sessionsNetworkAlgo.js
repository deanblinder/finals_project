var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const session_network_utils = require("./utils/session_network_utils");




router.get("/getSessionByUserId/:userId", async (req, res, next) => {
    let session = [];
    try {
        const session_details = await session_network_utils.getSessionByUserId(
            req.params.userId
        );
        console.log(session_details)
        // session.push(session_details)
        res.send(session_details).status(200);
    } catch (error) {
        next(error);
    }
});

// need to fix
router.post("/addSession/:agent_type/:score", async (req, res, next) => {
    try {
        const agent_type = req.params.agent_type
        const score = req.params.score
        
        console.log("in router.post: before adding")
        await session_network_utils.addSession('1',agent_type, score);
        console.log("in router.post: after adding")
        res.status(201).send("The Session added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteSessionByUserSessionId/:userId", async (req, res, next) => {
    let users = [];
    try {
        await session_network_utils.deleteSessionByUserSessionId(
            req.params.userId
        );
        //we should keep implementing team page.....
        res.send(users).status(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;