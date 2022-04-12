var express = require("express");
var router = express.Router();
const params_utils = require("./utils/params_utils");


router.get("/getParamValue/:paramName", async (req, res, next) => {
    try {
        console.log('---in getParamValue---')
        const param_value = await params_utils.getParamValue(
            req.params.paramName
        );
        console.log("after get getParamValue: ",param_value)
        res.send(param_value).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getAllParamsValue", async (req, res, next) => {
    try {
        console.log('---in getAllParamsValue---')
        const all_params_and_value = await params_utils.getAllParamsValue();
        console.log("after getAllParamsValue: ",all_params_and_value)
        res.send(all_params_and_value).status(200);
    } catch (error) {
        next(error);
    }
});


// router.post("/addAgent/:AgentType/:permanentDelay/:variance", async (req, res, next) => {
//     try {
//         const AgentType = req.params.AgentType
//         const permanentDelay = req.params.permanentDelay
//         const variance = req.params.variance
//         await params_utils.addAgent(AgentType,permanentDelay, variance);
//         res.status(201).send("The Agent added");
//     } catch (error) {
//         next(error);
//     }
// });

router.post("/updateParamValue/:paramName/:value", async (req, res, next) => {
    try {
        console.log("in updateParamValue")
        const paramName = req.params.paramName
        const value = req.params.value

        await params_utils.updateParamValue(paramName,value);
        console.log("after added updateParamValue")
        res.status(200).send("The param update");
    } catch (error) {
        next(error);
    }
});

// router.delete("/deleteAgent/:AgentType", async (req, res, next) => {
//
//     try {
//         await params_utils.deleteAgentByAgentType(
//             req.params.AgentType
//         );
//         res.status(200);
//     } catch (error) {
//         next(error);
//     }
// });

module.exports = router;