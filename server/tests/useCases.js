const api_domain = "https://syncProject.cs.bgu.ac.il:443"

const axios = require('axios');
//make axios work with cookies, so we can save session between tests
const axiosCookieJarSupport = require('axios-cookiejar-support').default;
const tough = require('tough-cookie');
const cookieJar = new tough.CookieJar();
const axios_with_cookies  = axios.create({
    jar: cookieJar,
    withCredentials: true
});
axiosCookieJarSupport(axios_with_cookies);

// ------------------------- Tests -------------------------
async function administratorLoginUC(username, password){
    try{
        return await axios_with_cookies.get(`${api_domain}/admin/administratorLogin/${username}/${password}`);
    } catch(error){
        return error;
    }
}

async function changeAgentParamsUC(agent,latency,variance){
    try{
        return await axios_with_cookies.post(`${api_domain}/agents/updateAgentByAgentType/${agent}/${latency}/${variance}`);
    } catch(error){
        return error;
    }
}

async function registerPlayerUC(mail, age, gender, deviceUid, version){
    try{
        return await axios_with_cookies.post(`${api_domain}/users/addUser/${mail}/${age}/${gender}/${deviceUid}/${version}`, {});
    } catch(error){
        return error;
    }
}

async function sendAnswersUC(user_id, agent_type, qDict, game_num){
    try{
        const ans1 = qDict["questionOne"];
        const ans2 = qDict["questionTwo"];
        const ans3 = qDict["questionThree"];
        const ans4 = qDict["questionFour"];
        const ans5 = qDict["questionFive"];
        const ans6 = qDict["questionSix"];
        const ans7 = qDict["questionSeven"];
        return await axios_with_cookies.post(`${api_domain}/dictAns/addAnswers/${user_id}/${agent_type}/${ans1}/${ans2}/${ans3}/${ans4}/${ans5}/${ans6}/${ans7}/${game_num}`, {});
    } catch(error){
        return error;
    }
}

async function sendFeedBackUC(deviceUUID, feedBack, best_player){
    try{
        return await axios_with_cookies.post(`${api_domain}/feedback/addFeedback/${deviceUUID}/${feedBack}/${best_player}`);
    } catch(error){
        return error;
    }
}

async function sendPressTimeStampUC(deviceUUID,playerTimeStampArr, agentTimeStampArr, experimentInfo){
    try{
        return await axios_with_cookies.post(`${api_domain}/actions/addAction/${deviceUUID}/${playerTimeStampArr}/${agentTimeStampArr}/${experimentInfo}`);
    } catch(error){
        return error;
    }
}


async function isUserModelExistsUC(uuid){
    try{
        return await axios_with_cookies.post(`${api_domain}/users/isUserModelExists/${uuid}`);
    } catch(error){
        return error;
    }
}

// ------------------------- DELETE -------------------------
async function deleteAgentUC(AgentType){
    try{
        return await axios_with_cookies.delete(`${api_domain}/agents/deleteAgent/${AgentType}`);
    } catch(error){
        return error;
    }
}

async function deleteUserByEmailUC(email){
    try{
        return await axios_with_cookies.delete(`${api_domain}/users/deleteUserByEmail/${email}`);
    } catch(error){
        return error;
    }
}
async function deleteAnswerByUserIdUC(user_id){
    try{
        return await axios_with_cookies.delete(`${api_domain}/userAnswers/deleteAnswerByUserId/${user_id}`);
    } catch(error){
        return error;
    }
}

async function deleteFeedbackByUserIdUC(user_id){
    try{
        return await axios_with_cookies.delete(`${api_domain}/feedback/deleteFeedbackByUserId/${user_id}`);
    } catch(error){
        return error;
    }
}

async function deleteActionByUserSessionIdUC(user_id){
    try{
        return await axios_with_cookies.delete(`${api_domain}/actions/deleteActionByUserSessionId/${user_id}`);
    } catch(error){
        return error;
    }
}


exports.administratorLoginUC = administratorLoginUC;
exports.changeAgentParamsUC = changeAgentParamsUC;
exports.registerPlayerUC = registerPlayerUC;
exports.sendAnswersUC = sendAnswersUC;
exports.sendFeedBackUC = sendFeedBackUC;
exports.sendPressTimeStampUC = sendPressTimeStampUC;
exports.isUserModelExistsUC = isUserModelExistsUC;

exports.deleteAgentUC = deleteAgentUC;
exports.deleteUserByEmailUC = deleteUserByEmailUC;
exports.deleteAnswerByUserIdUC = deleteAnswerByUserIdUC;
exports.deleteFeedbackByUserIdUC = deleteFeedbackByUserIdUC;
exports.deleteActionByUserSessionIdUC = deleteActionByUserSessionIdUC;
