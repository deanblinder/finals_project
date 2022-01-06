const DButils = require("./DButils");

async function getAgentByAgentType(AgentType) {
    return await DButils.execQuery(
        `select * from agents where id='${AgentType}'`
    );
}

async function addAgent(AgentType,permanentDelay, variance) {
    console.log("add agent")
    await DButils.execQuery(
        `INSERT INTO agents VALUES ('${AgentType}','${permanentDelay}','${variance}')`
    );
}

async function updateAgent(AgentType,permanentDelay, variance) {
    console.log("update agent details")
    await DButils.execQuery(
        `UPDATE agents SET permanentDelay='${permanentDelay}', variance='${variance}' where agent_type='${AgentType}' `
    );
}



async function deleteAgentByAgentType(AgentType) {
    console.log("in delete agent")
    await DButils.execQuery(
        `DELETE FROM agents where agent_type='${AgentType}'`
    );
}


exports.getAgentByAgentType= getAgentByAgentType;
exports.addAgent= addAgent;
exports.deleteAgentByAgentType= deleteAgentByAgentType;
exports.updateAgent= updateAgent;