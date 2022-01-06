const DButils = require("./DButils");

async function getSessionByUserId(user_id) {
    return await DButils.execQuery(
        `select * from sessionsAgentLeaderAlgo where user_session_id='${user_id}'`
    );
}

async function addSession(user_session_id, id, agent_type, score ) {
    console.log("add session")
    await DButils.execQuery(
        `INSERT INTO sessionsAgentLeaderAlgo VALUES ('${user_session_id}', '${id}','${agent_type}','${score}')`
    );
}

async function deleteSessionByUserSessionId(id) {
    console.log("in delete session")
    await DButils.execQuery(
        `DELETE FROM sessionsAgentLeaderAlgo where user_session_id='${id}'`
    );
}


exports.getSessionByUserId= getSessionByUserId;
exports.addSession= addSession;
exports.deleteSessionByUserSessionId= deleteSessionByUserSessionId;