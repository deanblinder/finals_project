var express = require("express");
var router = express.Router();
const userAnswers_utils = require("./utils/userAnswers_utils");

router.get("/addAnswers/:user_id/:agent_type/:ans1/:ans2/:ans3/:ans4/:ans5/:ans6/:ans7", async (req, res, next) => {
    try {
        //id = uuid
        console.log('---in addAnswers---')
        const user_id = req.params.user_id
        const agent_type = req.params.agent_type
        const ans_1 = req.params.ans1
        const ans_2 = req.params.ans2
        const ans_3 = req.params.ans3
        const ans_4 = req.params.ans4
        const ans_5 = req.params.ans5
        const ans_6 = req.params.ans6
        const ans_7 = req.params.ans7
        await userAnswers_utils.addNewAnswer(user_id,agent_type,ans_1,ans_2,ans_3,ans_4,ans_5,ans_6,ans_7);
        console.log("after added addAnswers")
        res.status(200).send("The Answer added");
    } catch (error) {
        next(error);
    }
});

module.exports = router;