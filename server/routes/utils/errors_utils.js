const DButils = require("./DButils");

async function getErrorByUserId(userId) {
    return await DButils.execQuery(
        `select * from errors where user_id='${userId}'`
    );
}

async function addError(userId, agentType, error) {
    console.log("add error")
    await DButils.execQuery(
        `INSERT INTO errors VALUES ('${userId}','${agentType}','${error}')`
    );
}


async function deleteErrorByUserId(userId) {
    console.log("in delete error")
    await DButils.execQuery(
        `DELETE FROM errors where user_id='${userId}'`
    );
}


exports.getErrorByUserId= getErrorByUserId;
exports.addError= addError;
exports.deleteErrorByUserId= deleteErrorByUserId;