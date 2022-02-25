import axios from 'axios';
const events_data = [];

const createApiClient = () => {
    return {
        // administratorLogin:(username,password)=>{
        //     return axios.post(`http://172.20.10.3:3232/api/administratorLogin/${username}/${password}`).then((res) => res.data);
        // },
        // changeAgentParams:(agent,latency,variance)=>{
        //     return axios.post(`http://172.20.10.3:3232/api/changeAgentParams/${agent}/${latency}/${variance}`).then((res) => res.data);
        // },
        // registerPlayer:(mail,age,gender,deviceUid)=>{
        //     return axios.post(`http://172.20.10.3:3232/api/registerPlayer/${mail}/${age}/${gender}/${deviceUid}`).then((res) => res.data);
        // },
        // sendQuestionnaireAnswers:(qDict,deviceUid)=>{
        //     return axios.post(`http://172.20.10.3:3232/api/questionnaireAnswers/${deviceUid}`,qDict).then((res) => res.data);
        // },
        // sendFeedBack:(feedBack,deviceUUID)=>{
        //     return axios.post(`http://172.20.10.3:3232/api/sendFeedBack/${feedBack}/${deviceUUID}`).then((res) => res.data);
        // },
        // sendPressTimeStamp:(playerData, agentData)=>{
        //     console.log(playerData, agentData)
        //     const data = {
        //         player: playerData,
        //         agent: agentData
        //     }
        //     return axios.post(`http://172.20.10.3:3232/api/sendGameData`,data).then((res) => res.data);
        // }, v
        administratorLogin: (username, password) => {
            console.log("in api administratorLogin");
            return axios.get(`http://127.0.0.1:3232/admin/administratorLogin/${username}/${password}`).then((res) => res);
            },
        changeAgentParams:(agent,latency,variance)=>{
            return axios.put(`http://127.0.0.1:3232/agents/updateAgentByAgentType/${agent}/${latency}/${variance}`).then((res) => res);
        },
        registerPlayer:(mail,age,gender,deviceUid,version)=>{
            return axios.post(`http://127.0.0.1:3232/users/addUser/${mail}/${age}/${gender}/${deviceUid}/${version}`).then((res) => res);
        },
        sendQuestionnaireAnswers:(qDict,agentType,deviceUid)=>{
            console.log("deviceUid: ", deviceUid, "agentType: ", "qDict: ",qDict)
            return axios.post(`http://127.0.0.1:3232/userAnswers/addNewAnswer/${deviceUid}/${agentType}`,qDict).then((res) => res);
        },
        sendFeedBack:(deviceUUID, feedBack)=>{
            return axios.post(`http://127.0.0.1:3232/feedback/addFeedback/${deviceUUID}/${feedBack}`).then((res) => res);
        },
        sendPressTimeStamp:(userId,actionOwner, pressTimeArr)=>{
            console.log("userId: ", userId,"actionOwner: ", actionOwner,"pressTimeArr: ", pressTimeArr)
            return axios.post(`http://127.0.0.1:3232/actions/addAction/${userId}/${actionOwner}/${pressTimeArr}`).then((res) => res);
        },
    }

}
export default createApiClient();