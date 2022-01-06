const DButils = require("./DButils");

async function getSessionByUserId(user_id) {
    return await DButils.execQuery(
        `select * from sessionsNetworkAlgo where id='${user_id}'`
    );
}

async function addSession(id, agent_type, score ) {
    console.log("add session")
    await DButils.execQuery(
        `INSERT INTO sessionsNetworkAlgo VALUES ('${id}','${agent_type}','${score}')`
    );
}

async function deleteSessionByUserSessionId(id) {
    console.log("in delete session")
    await DButils.execQuery(
        `DELETE FROM Users where id='${id}'`
    );
}


exports.getSessionByUserId= getSessionByUserId;
exports.addSession= addSession;
exports.deleteSessionByUserSessionId= deleteSessionByUserSessionId;