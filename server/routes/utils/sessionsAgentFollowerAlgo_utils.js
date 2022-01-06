const DButils = require("./DButils");

async function getSessionByUserId(user_id) {
    console.log(" in getSessionByUserId")
    return await DButils.execQuery(
        `select * from sessionsAgentFollowerAlgo where user_session_id='${user_id}'`
    );
}


async function addNewSession(user_session_id,id, agent_type,score) {
    console.log(" in addNewSession")
    await DButils.execQuery(
        `INSERT INTO sessionsAgentFollowerAlgo VALUES ('${user_session_id}','${id}','${agent_type}','${score}')`
    );
}

async function deleteSessionByUserSessionId(user_session_id) {
    console.log(" in delete user")
    await DButils.execQuery(
        `DELETE FROM sessionsAgentFollowerAlgo where user_session_id='${user_session_id}'`
    );
}

exports.getSessionByUserId= getSessionByUserId;
exports.addNewSession= addNewSession;
exports.deleteSessionByUserSessionId= deleteSessionByUserSessionId;