import axios from 'axios';

const createApiClient = () => {
    return {
        administratorLogin:(username,password)=>{
            return axios.post(`http://172.20.10.3:3232/api/administratorLogin/${username}/${password}`).then((res) => res.data);
        },
        changeAgentParams:(agent,latency,variance)=>{
            return axios.post(`http://172.20.10.3:3232/api/changeAgentParams/${agent}/${latency}/${variance}`).then((res) => res.data);
        },
        registerPlayer:(mail,age,gender)=>{
            return axios.post(`http://172.20.10.3:3232/api/registerPlayer/${mail}/${age}/${gender}`).then((res) => res.data);
        },
        sendQuestionnaireAnswers:(qDict)=>{
            return axios.post(`http://172.20.10.3:3232/api/questionnaireAnswers`,qDict).then((res) => res.data);
        },
        sendFeedBack:(feedBack)=>{
            return axios.post(`http://172.20.10.3:3232/api/sendFeedBack/${feedBack}`).then((res) => res.data);
        },
        sendPressTimeStamp:(playerData, agentData)=>{
            console.log(playerData, agentData)
            const data = {
                player: playerData,
                agent: agentData
            }
            return axios.post(`http://172.20.10.3:3232/api/sendGameData`,data).then((res) => res.data);
        },
    }
}
export default createApiClient();