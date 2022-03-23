const DButils = require("./DButils");

async function getParamValue(paramName) {
    return await DButils.execQuery(
        `select * from params where param_name='${paramName}'`
    );
}

async function getAllParamsValue() {
    return await DButils.execQuery(
        `select * from params`
    );
}
// async function addAgent(AgentType,permanentDelay, variance) {
//     console.log("add agent")
//     await DButils.execQuery(
//         `INSERT INTO agents VALUES ('${AgentType}','${permanentDelay}','${variance}')`
//     );
// }

async function updateParamValue(paramName,value) {
    console.log("update param value")
    await DButils.execQuery(
        `UPDATE params SET value ='${value}' where param_name='${paramName}' `
    );
}

// async function deleteAgentByAgentType(AgentType) {
//     console.log("in delete agent")
//     await DButils.execQuery(
//         `DELETE FROM agents where agent_type='${AgentType}'`
//     );
// }


exports.getParamValue= getParamValue;
exports.updateParamValue= updateParamValue;
exports.getAllParamsValue = getAllParamsValue;
// exports.deleteAgentByAgentType= deleteAgentByAgentType;
// exports.updateAgent= updateAgent;