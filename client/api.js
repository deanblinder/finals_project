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
        administratorLogin: async (username, password) => {
            console.log("in api administratorLogin");
            return await axios.get(`http://10.0.2.2:3232/admin/administratorLogin/${username}/${password}`).then((res) => res);
            },
        changeAgentParams:(agent,latency,variance)=>{
            return axios.post(`http://10.0.2.2:3232/agents/updateAgentByAgentType/${agent}/${latency}/${variance}`).then((res) => res);
        },
        getParamValue:(paramName)=>{
            return axios.post(`http://10.0.2.2:3232/params/getParamValue/${paramName}`).then((res) => res);
        },
        getAllParamsValue:()=>{
            return axios.post(`http://10.0.2.2:3232/params/getAllParamsValue`).then((res) => res);
        },
        changeParamValue:(paramName,value)=>{
            return axios.post(`http://10.0.2.2:3232/params/updateParamValue/${paramName}/${value}`).then((res) => res);
        },
        registerPlayer:(mail,age,gender,deviceUid,version)=>{
            return axios.post(`http://10.0.2.2:3232/users/addUser/${mail}/${age}/${gender}/${deviceUid}/${version}`).then((res) => res);
        },
        sendQuestionnaireAnswers:(qDict,agentType,deviceUid)=>{
            return axios.post(`http://10.0.2.2:3232/userAnswers/addNewAnswer/${deviceUid}`,qDict).then((res) => res);
        },
        sendFeedBack:(deviceUUID, feedBack)=>{
            return axios.post(`http://10.0.2.2:3232/feedback/addFeedback/${deviceUUID}/${feedBack}`).then((res) => res);
        },
        sendPressTimeStamp:(userId,actionOwner, pressTimeArr)=>{
            console.log(userId,actionOwner, pressTimeArr)
            return axios.post(`http://10.0.2.2:3232/actions/addAction/${userId}/${actionOwner}/${pressTimeArr}`).then((res) => res);
        },
    }

}
export default createApiClient();