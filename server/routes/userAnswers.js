var express = require("express");
var router = express.Router();
const userAnswers_utils = require("./utils/userAnswers_utils");


router.get("/getAnswerByUserId/:userId", async (req, res, next) => {
    try {
        const user_answers_details = await userAnswers_utils.getAnswerByUserId(
            req.params.userId
        );
        console.log(user_answers_details)
        res.send(user_answers_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getAnswerByQuestionNumber/:question_number", async (req, res, next) => {
    try {
        const user_answers_details = await userAnswers_utils.getAnswerByQuestionNumber(
            req.params.question_number
        );
        //we should keep implementing team page.....
        console.log(user_answers_details)
        res.send(user_answers_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getAnswerByAgentType/:agent_type", async (req, res, next) => {
    try {
        const user_answers_details = await userAnswers_utils.getAnswerByAgentType(
            req.params.agent_type
        );
        console.log(user_answers_details)
        user_answers.push(user_answers_details)
        res.send(user_answers_details).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addNewAnswer/:user_id/:agent_type/:qDict", async (req, res, next) => {
    try {
        console.log('---in addNewAnswer---')
        const user_id = req.params.user_id
        const agent_type = req.params.agent_type
        const qDict = req.body.qDict
        await userAnswers_utils.addNewAnswer(user_id, agent_type, qDict);
        console.log("after addNewAnswer")
        res.status(201).send("The answers added");
    } catch (error) {
        next(error);
    }
});

router.delete("/deleteAnswerByUserId/:user_id", async (req, res, next) => {
    try {
        await userAnswers_utils.deleteAnswerByUserId(
            req.params.user_id
        );
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;