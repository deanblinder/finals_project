var express = require("express");
var router = express.Router();
const feedback_utils = require("./utils/feedback_utils");
const users_utils = require("./utils/users_utils")

router.get("/getFeedbackByUserId/:userId", async (req, res, next) => {
    let user_feedback = [];
    try {
        const user_details = await feedback_utils.getFeedbackByUserId(
            req.params.userId
        );
        //we should keep implementing team page.....
        console.log(user_details)
        user_feedback.push(user_details)
        res.send(user_feedback).status(200);
    } catch (error) {
        next(error);
    }
});


router.post("/addFeedback/:uuid/:feedback", async (req, res, next) => {
    try {
        const uuid = req.params.uuid
        const feedback = req.params.feedback

        const user_id = users_utils.getUserIdByUUID(uuid)
        await feedback_utils.addFeedback(user_id,feedback);
        res.status(201).send("The User added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteFeedbackByUserId/:user_id", async (req, res, next) => {
    try {
        await feedback_utils.deleteFeedbackByUserId(
            req.params.user_id
        );
        //we should keep implementing team page.....
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;