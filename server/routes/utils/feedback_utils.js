const DButils = require("./DButils");

async function getFeedbackByUserId(user_id) {
    console.log(" in getFeedbackByUserId")
    return await DButils.execQuery(
        `select * from feedback where user_id='${user_id}'`
    );
}

async function addFeedback(user_id,feedback,bestPlayer) {
    console.log(" in addFeedback")
    await DButils.execQuery(
        `INSERT INTO feedback VALUES ('${user_id}','${feedback}',${bestPlayer})`
    );
}

async function deleteFeedbackByUserId(user_id) {
    console.log(" in deleteFeedbackByUserId")
    await DButils.execQuery(
        `DELETE FROM feedback where user_id='${user_id}'`
    );
}

exports.getFeedbackByUserId= getFeedbackByUserId;
exports.addFeedback= addFeedback;
exports.deleteFeedbackByUserId= deleteFeedbackByUserId;