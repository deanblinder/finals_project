const DButils = require("./DButils");

async function getAnswerByUserId(user_id) {
    console.log(" in getAnswerByUserId")
    return await DButils.execQuery(
        `select answer from userAnswers where user_id='${user_id}'`
    );
}
async function getAnswerByQuestionNumber(question_number) {
    console.log(" in getAnswerByQuestionNumber")
    return await DButils.execQuery(
        `select answer from userAnswers where question_number='${question_number}'`
    );

}async function getAnswerByAgentType(agent_type) {
    console.log(" in getAnswerByAgentType")
    return await DButils.execQuery(
        `select answer from userAnswers where agent_type='${agent_type}'`
    );
}

async function addNewAnswer(user_id, agent_type, ans_1) {
    console.log(" in addNewAnswer")
    // console.log(qDict)
    // console.log("length: ", Object.keys(qDict).length)
    await DButils.execQuery(
        `INSERT INTO userAnswers VALUES ('${user_id}','${agent_type}','${ans_1}','${2}','${3}','${4}','${5}','${6}','${7}')`
    );
}

async function deleteAnswerByUserId(user_id) {
    console.log(" in deleteAnswerByUserId")
    await DButils.execQuery(
        `DELETE FROM userAnswers where user_id='${user_id}'`
    );
}

exports.getAnswerByUserId= getAnswerByUserId;
exports.getAnswerByQuestionNumber= getAnswerByQuestionNumber;
exports.getAnswerByAgentType= getAnswerByAgentType;
exports.addNewAnswer= addNewAnswer;
exports.deleteAnswerByUserId= deleteAnswerByUserId;