var express = require("express");
var router = express.Router();
const errors_utils = require("./utils/errors_utils");




router.get("/getErrorByUserId/:userId", async (req, res, next) => {
    try {
        const errors_details = await errors_utils.getErrorByUserId(
            req.params.userId
        );
        console.log(errors_details)
        res.send(errors_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addError/:UserId/:AgentType/:Error", async (req, res, next) => {
    try {
        const UserId = req.params.UserId
        const AgentType = req.params.AgentType
        const Error = req.params.Error
        await errors_utils.addError(UserId,AgentType, Error);
        res.status(201).send("The Error added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteErrorByUserId/:userId", async (req, res, next) => {
    try {
        await errors_utils.deleteErrorByUserId(
            req.params.userId
        );
        res.status(200);
    } catch (error) {
        next(error);
    }
});


module.exports = router;