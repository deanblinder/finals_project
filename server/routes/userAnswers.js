var express = require("express");
var router = express.Router();
const userAnswers_utils = require("./utils/userAnswers_utils");
const users_utils = require("./utils/users_utils");

console.log("yessss")
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

router.post("/addNewAnswer/:user_id/:agent_type/:ans_1", async (req, res, next) => {
    try {
        console.log('---in addNewAnswer---')
        const user_id = req.params.user_id
        const agent_type = req.params.agent_type
        const ans_1 = req.params.ans_1
        // const ans_2 = req.params.ans_2
        // const ans_3 = req.params.ans_3
        // const ans_4 = req.params.ans_4
        // const ans_5 = req.params.ans_5
        // const ans_6 = req.params.ans_6
        // const ans_7 = req.params.ans_7
        console.log("req", req)

        const qDict = req.body.qDict
        console.log('qDict' ,qDict)
        console.log(JSON.stringify(qDict))
        await userAnswers_utils.addNewAnswer(user_id, agent_type, ans_1);
        console.log("after addNewAnswer")
        res.status(201).send("The answers added");
    } catch (error) {
        next(error);
    }
});

router.post("/addAnswers/:deviceUUID/:agentType/:ans_1", async (req, res, next) => {
    try {
        //id = uuid
        console.log('---in addAnswers---')
        const deviceUUID = req.params.deviceUUID
        const agentType = req.params.agentType
        const ans_1 = req.params.ans_1
        await userAnswers_utils.addNewAnswer(deviceUUID,agentType,ans_1);
        console.log("after added addAnswers")
        res.status(200).send("The User added");
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