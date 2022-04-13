import axios from 'axios';
const events_data = [];
import {NetworkInfo} from 'react-native-network-info';
// require module
// var NetworkInfo = require('react-native-network-info');
// console.log(NetworkInfo.NetworkInfo.getIPV4Address())
// // Get Local IP
// NetworkInfo.NetworkInfo.getIPV4Address().then(ipv4Address => {
//     console.log(ipv4Address);
// });
// import publicIp from 'public-ip';
// export const getClientIp = async () => await publicIp.v4({
//     fallbackUrls: [ "https://ifconfig.co/ip" ]
// });
// console.log(getClientIp())

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
            return await axios.get(`http://192.168.98.35:3232/admin/administratorLogin/${username}/${password}`).then((res) => res);
            },
        changeAgentParams:(agent,latency,variance)=>{
            console.log("in api changeAgentParams- agent: ", agent, " latency: ",latency," variance: ",variance);
            return axios.post(`http://192.168.98.35:3232/agents/updateAgentByAgentType/${agent}/${latency}/${variance}`).then((res) => res);
        },
        getParamValue:(paramName)=>{
            console.log("in api getParamValue- paramName: ", paramName);

            return axios.post(`http://192.168.98.35:3232/params/getParamValue/${paramName}`).then((res) => res);
        },
        getAllParamsValue:()=>{
            console.log("in api getAllParamsValue");
            return axios.post(`http://192.168.98.35:3232/params/getAllParamsValue`).then((res) => res);
        },
        changeParamValue:(paramName,value)=>{
            console.log("in api changeParamValue- paramName: ", paramName," value: ",value);

            return axios.post(`http://192.168.98.35:3232/params/updateParamValue/${paramName}/${value}`).then((res) => res);
        },
        registerPlayer:(mail,age,gender,deviceUid,version)=>{
            // console.log("in api registerPlayer- mail: ", mail," age: ",age, " gender: ", gender, " deviceUid: ",deviceUid, "version: ",version);

            return axios.post(`http://192.168.98.35:3232/users/addUser/${mail}/${age}/${gender}/${deviceUid}/${version}`).then((res) => res);
        },
        sendAnswers:(deviceUUID,agentType,qDict)=>{
            // console.log("in api registerPlayer- mail: ", mail," age: ",age, " gender: ", gender, " deviceUid: ",deviceUid, "version: ",version);
            console.log("in sendAnswers")
            const ans_1 = qDict["questionOne"];
            return axios.post(`http://192.168.98.35:3232/userAnswers/addAnswers/${deviceUUID}/${agentType}/${1}`).then((res) => res);
        },
        sendQuestionnaireAnswers:(qDict,agentType,deviceUid)=>{
            console.log("in api sendQuestionnaireAnswers- qDict[questionOne]: ", qDict["questionOne"]," agentType: ",agentType, "deviceUid: ",deviceUid);
            return axios.post(`http://192.168.98.35:3232/feedback/addFeedback/${deviceUid}/${agentType}`).then((res) => res);
            // return axios.post(`http://192.168.98.35:3232/userAnswers/addNewAnswer/${deviceUid}/${agentType}/${qDict['questionOne']}/${qDict['questionTwo']}/${qDict['questionThree']}/${qDict['questionFour']}/${qDict['questionFive']}/${qDict['questionSix']}/${qDict['questionSeven']}`).then((res) => res);
        },
        sendFeedBack:(deviceUUID, feedBack)=>{
            console.log("in api sendFeedBack- deviceUUID: ", deviceUUID," feedBack: ",feedBack);
            return axios.post(`http://192.168.98.35:3232/feedback/addFeedback/${deviceUUID}/${feedBack}`).then((res) => res);
        },
        sendPressTimeStamp:(deviceUUID,playerTimeStampArr, agentTimeStampArr, experimentInfo)=>{
            // console.log("in api sendPressTimeStamp- ", "deviceUUID:", deviceUUID, " playerTimeStampArr: ", playerTimeStampArr," agentTimeStampArr: ",agentTimeStampArr, "experimentInfo: ",experimentInfo);
            // console.log(pressTimeArr.length)
            return axios.post(`http://192.168.98.35:3232/actions/addAction/${deviceUUID}/${playerTimeStampArr}/${agentTimeStampArr}/${experimentInfo}`).then((res) => res);
        },
    }

}
export default createApiClient();