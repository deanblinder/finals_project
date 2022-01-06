const DButils = require("./DButils");

async function getActionByUserId(userId) {
    return await DButils.execQuery(
        `select * from action where user_session_id='${userId}'`
    );
}

async function addAction(userSessionId,sessionId, actionOwner,timePress) {
    console.log("add action")

    await DButils.execQuery(
        `INSERT INTO action VALUES ('${userSessionId}','${sessionId}','${actionOwner}','${timePress}')`
    );
}




async function deleteActionByUserSessionId(userId) {
    console.log("in delete action")
    await DButils.execQuery(
        `DELETE FROM action where user_session_id='${userId}'`
    );
}


exports.getActionByUserId= getActionByUserId;
exports.addAction= addAction;
exports.deleteActionByUserSessionId= deleteActionByUserSessionId;
