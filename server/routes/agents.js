var express = require("express");
var router = express.Router();
const agents_utils = require("./utils/agents_utils");


router.get("/getAgentByAgentType/:AgentType", async (req, res, next) => {
    let agents = [];
    try {
        const agents_details = await agents_utils.getAgentByAgentType(
            req.params.AgentType
        );
        console.log(agents_details)
        res.send(agents_details).status(200);
    } catch (error) {
        next(error);
    }
});



router.post("/addAgent/:AgentType/:permanentDelay/:variance", async (req, res, next) => {
    try {
        const AgentType = req.params.AgentType
        const permanentDelay = req.params.permanentDelay
        const variance = req.params.variance
        await agents_utils.addAgent(AgentType,permanentDelay, variance);
        res.status(201).send("The Agent added");
    } catch (error) {
        next(error);
    }
});

router.post("/updateAgentByAgentType/:AgentType/:permanentDelay/:variance", async (req, res, next) => {
    try {
        console.log("in updateAgentByAgentType")
        const AgentType = req.params.AgentType
        const permanentDelay = req.params.permanentDelay
        const variance = req.params.variance

        await agents_utils.updateAgent(AgentType,permanentDelay, variance);
        console.log("after added updateAgentByAgentType")
        res.status(200).send("The Agent added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteAgent/:AgentType", async (req, res, next) => {

    try {
       await agents_utils.deleteAgentByAgentType(
            req.params.AgentType
        );
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;