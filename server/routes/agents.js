var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const agents_utils = require("./utils/agents_utils");


/**
 * Authenticate all incoming requests by middleware
 */
// router.use(async function (req, res, next) {
//     if (req.session && req.session.user_id) {
//         DButils.execQuery("SELECT user_id FROM Users")
//             .then((users) => {
//                 if (users.find((x) => x.user_id === req.session.user_id)) {
//                     req.user_id = req.session.user_id;
//                     next();
//                 }
//             })
//             .catch((err) => next(err));
//     } else {
//         res.sendStatus(401);
//     }
// });


router.get("/getAgentByAgentType/:AgentType", async (req, res, next) => {
    let agents = [];
    try {
        const agents_details = await agents_utils.getAgentByAgentType(
            req.params.AgentType
        );
        //we should keep implementing team page.....
        console.log(agents_details)
        res.send(agents).status(200);
    } catch (error) {
        next(error);
    }
});



router.post("/addAgent/:AgentType/:permanentDelay/:variance", async (req, res, next) => {
    try {
        const AgentType = req.params.AgentType
        const permanentDelay = req.params.permanentDelay
        const variance = req.params.variance

        console.log("in router.post: before adding")
        await agents_utils.addAgent(AgentType,permanentDelay, variance);
        console.log("in router.post: after adding")
        res.status(201).send("The Agent added");
    } catch (error) {
        next(error);
    }
});

router.put("/updateAgentByAgentType/:AgentType/:permanentDelay/:variance", async (req, res, next) => {
    try {
        const AgentType = req.params.AgentType
        const permanentDelay = req.params.permanentDelay
        const variance = req.params.variance

        console.log("in router.post: before adding")
        await agents_utils.updateAgent(AgentType,permanentDelay, variance);
        console.log("in router.post: after adding")
        res.status(201).send("The Agent added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteAgent/:AgentType", async (req, res, next) => {
    let users = [];
    try {
       await agents_utils.deleteAgentByAgentType(
            req.params.AgentType
        );
        res.send(users).status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;