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
            console.log("in api administratorLogin- username: ", username," password: ",password);
            return await axios.get(`http://10.0.2.2:3232/admin/administratorLogin/${username}/${password}`).then((res) => res);
            },
        changeAgentParams:(agent,latency,variance)=>{
            console.log("in api changeAgentParams- agent: ", agent, " latency: ",latency," variance: ",variance);
            return axios.post(`http://10.0.2.2:3232/agents/updateAgentByAgentType/${agent}/${latency}/${variance}`).then((res) => res);
        },
        getParamValue:(paramName)=>{
            console.log("in api getParamValue- paramName: ", paramName);

            return axios.post(`http://10.0.2.2:3232/params/getParamValue/${paramName}`).then((res) => res);
        },
        getAllParamsValue:()=>{
            console.log("in api getAllParamsValue");
            return axios.post(`http://10.0.2.2:3232/params/getAllParamsValue`).then((res) => res);
        },
        changeParamValue:(paramName,value)=>{
            console.log("in api changeParamValue- paramName: ", paramName," value: ",value);

            return axios.post(`http://10.0.2.2:3232/params/updateParamValue/${paramName}/${value}`).then((res) => res);
        },
        registerPlayer:(mail,age,gender,deviceUid,version)=>{
            console.log("in api registerPlayer- mail: ", mail," age: ",age, " gender: ", gender, " deviceUid: ",deviceUid, "version: ",version);
            return axios.post(`http://10.0.2.2:3232/users/addUser/${mail}/${age}/${gender}/${deviceUid}/${version}`).then((res) => res);
        },
        sendQuestionnaireAnswers:(qDict,agentType,deviceUid)=>{
            console.log("in api sendQuestionnaireAnswers- qDict: ", qDict," agentType: ",agentType, "deviceUid: ",deviceUid);
            return axios.post(`http://10.0.2.2:3232/userAnswers/addNewAnswer/${deviceUid}`,qDict).then((res) => res);
        },
        sendFeedBack:(deviceUUID, feedBack)=>{
            console.log("in api sendFeedBack- deviceUUID: ", deviceUUID," feedBack: ",feedBack);
            return axios.post(`http://10.0.2.2:3232/feedback/addFeedback/${deviceUUID}/${feedBack}`).then((res) => res);
        },
        sendPressTimeStamp:(userId,actionOwner, pressTimeArr)=>{
            console.log("in api sendPressTimeStamp- userId: ", userId," actionOwner: ",actionOwner, "pressTimeArr: ",pressTimeArr);
            console.log(pressTimeArr.length)
            return axios.post(`http://10.0.2.2:3232/actions/addAction/${userId}/${actionOwner}/${pressTimeArr}`).then((res) => res);
        },
    }

}
export default createApiClient();