const DButils = require("./DButils");

async function getActionByUserId(userId) {
    return await DButils.execQuery(
        `select * from action where user_session_id='${userId}'`
    );
}

async function getSessionIdByUserId(userId) {
    return await DButils.execQuery(
        `select session_id from action where user_session_id='${userId}'`
    );
}

async function addAction(userSessionId,sessionId, actionOwner,pressTimeArr) {
    console.log("add action")
    for(let i=0 ; i< pressTimeArr.length ; i++){
        await DButils.execQuery(
            `INSERT INTO action VALUES ('${userSessionId}','${sessionId}','${actionOwner}','${pressTimeArr[i]}')`
        );
    }
}

async function deleteActionByUserSessionId(userId) {
    console.log("in delete action")
    await DButils.execQuery(
        `DELETE FROM action where user_session_id='${userId}'`
    );
}


exports.getActionByUserId= getActionByUserId;
exports.getSessionIdByUserId = getSessionIdByUserId;
exports.addAction= addAction;
exports.deleteActionByUserSessionId= deleteActionByUserSessionId;
