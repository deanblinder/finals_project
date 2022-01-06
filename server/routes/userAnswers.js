var express = require("express");
var router = express.Router();
const userAnswers_utils = require("./utils/userAnswers_utils");


router.get("/getAnswerByUserId/:userId", async (req, res, next) => {
    let user_answers = [];
    try {
        const user_answers_details = await userAnswers_utils.getAnswerByUserId(
            req.params.userId
        );
        //we should keep implementing team page.....
        console.log(user_answers_details)
        user_answers.push(user_answers_details)
        res.send(user_answers).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getAnswerByQuestionNumber/:question_number", async (req, res, next) => {
    let user_answers = [];
    try {
        const user_answers_details = await userAnswers_utils.getAnswerByQuestionNumber(
            req.params.question_number
        );
        //we should keep implementing team page.....
        console.log(user_answers_details)
        user_answers.push(user_answers_details)
        res.send(user_answers).status(200);
    } catch (error) {
        next(error);
    }
});

router.get("/getAnswerByAgentType/:agent_type", async (req, res, next) => {
    let user_answers = [];
    try {
        const user_answers_details = await userAnswers_utils.getAnswerByAgentType(
            req.params.agent_type
        );
        //we should keep implementing team page.....
        console.log(user_answers_details)
        user_answers.push(user_answers_details)
        res.send(user_answers).status(200);
    } catch (error) {
        next(error);
    }
});

router.post("/addNewAnswer/:user_id/:agent_type", async (req, res, next) => {
    try {
        const user_id = req.params.user_id
        const agent_type = req.params.agent_type
        const answerDict = req.body.qDict
        // const question_number = req.params.question_number
        // const answer = req.params.answer
        await userAnswers_utils.addNewAnswer(user_id, agent_type,answerDict);
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
        //we should keep implementing team page.....
        res.status(200);
    } catch (error) {
        next(error);
    }
});

module.exports = router;