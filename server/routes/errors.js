var express = require("express");
var router = express.Router();
const DButils = require("./utils/DButils");
const errors_utils = require("./utils/errors_utils");




router.get("/getErrorByUserId/:userId", async (req, res, next) => {
    let errors = [];
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

        console.log("in router.post: before adding")
        await errors_utils.addError(UserId,AgentType, Error);
        console.log("in router.post: after adding")
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