import axios from 'axios';
const events_data = [];
const address = "https://syncProject.cs.bgu.ac.il:443"
// const address = 'http://192.168.0.167:3232'
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
        //     return axios.post(address + `/api/administratorLogin/${username}/${password}`).then((res) => res.data);
        // },
        // changeAgentParams:(agent,latency,variance)=>{
        //     return axios.post(address + `/api/changeAgentParams/${agent}/${latency}/${variance}`).then((res) => res.data);
        // },
        // registerPlayer:(mail,age,gender,deviceUid)=>{
        //     return axios.post(address + `/api/registerPlayer/${mail}/${age}/${gender}/${deviceUid}`).then((res) => res.data);
        // },
        // sendQuestionnaireAnswers:(qDict,deviceUid)=>{
        //     return axios.post(address + '/api/questionnaireAnswers/${deviceUid}`,qDict).then((res) => res.data);
        // },
        // sendFeedBack:(feedBack,deviceUUID)=>{
        //     return axios.post(address + '/api/sendFeedBack/${feedBack}/${deviceUUID}`).then((res) => res.data);
        // },
        // sendPressTimeStamp:(playerData, agentData)=>{
        //     console.log(playerData, agentData)
        //     const data = {
        //         player: playerData,
        //         agent: agentData
        //     }
        //     return axios.post(address + `/api/sendGameData`,data).then((res) => res.data);
        // }, v

        administratorLogin: async (username, password) => {
            console.log("in api administratorLogin- username: ", username," password: ",password);
            return await axios.get(address + `/admin/administratorLogin/${username}/${password}`).then((res) => res);
            },
        changeAgentParams:(agent,latency,variance)=>{
            console.log("in api changeAgentParams- agent: ", agent, " latency: ",latency," variance: ",variance);
            return axios.post(address + `/agents/updateAgentByAgentType/${agent}/${latency}/${variance}`).then((res) => res);
        },
        getParamValue:(paramName)=>{
            console.log("in api getParamValue- paramName: ", paramName);

            return axios.post(address + `/params/getParamValue/${paramName}`).then((res) => res);
        },
        getAllParamsValue:()=>{
            console.log("in api getAllParamsValue");
            return axios.post(address + `/params/getAllParamsValue`).then((res) => res);
        },
        changeParamValue:(paramName,value)=>{
            console.log("in api changeParamValue- paramName: ", paramName," value: ",value);

            return axios.post(address + `/params/updateParamValue/${paramName}/${value}`).then((res) => res);
        },
        registerPlayer:(mail,age,gender,deviceUid,version)=>{
            // console.log("in api registerPlayer- mail: ", mail," age: ",age, " gender: ", gender, " deviceUid: ",deviceUid, "version: ",version);

            return axios.post(address + `/users/addUser/${mail}/${age}/${gender}/${deviceUid}/${version}`)
                .then((res) => res);
        },
        sendAnswers: (user_id, agent_type, qDict, game_num) => {

            console.log("in api sendAnswers- qDict: ", qDict," agent_type: ",agent_type, "deviceUid: ",user_id, "game_number: ",game_num);
            // agent_type = 'LeadFollow_0.2'
            // console.log(agent_type)
            // console.log(user_id)
            // console.log(qDict["questionOne"])

            const ans1 = qDict["questionOne"];
            const ans2 = qDict["questionTwo"];
            const ans3 = qDict["questionThree"];
            const ans4 = qDict["questionFour"];
            const ans5 = qDict["questionFive"];
            const ans6 = qDict["questionSix"];
            const ans7 = qDict["questionSeven"];
            return axios.post(address + `/dictAns/addAnswers/${user_id}/${agent_type}/${ans1}/${ans2}/${ans3}/${ans4}/${ans5}/${ans6}/${ans7}/${game_num}`)
                .then((res) => res);
        },
        sendQuestionnaireAnswers:(qDict,agentType,deviceUid)=>{
            console.log("in api sendQuestionnaireAnswers- qDict[questionOne]: ", qDict["questionOne"]," agentType: ",agentType, "deviceUid: ",deviceUid);
            // return axios.post(`http://192.168.98.35:3232/feedback/addFeedback/${deviceUid}/${agentType}`).then((res) => res);
            return axios.post(address + `/userAnswers/addNewAnswer/${deviceUid}/${agentType}/${qDict['questionOne']}/${qDict['questionTwo']}/${qDict['questionThree']}/${qDict['questionFour']}/${qDict['questionFive']}/${qDict['questionSix']}/${qDict['questionSeven']}`).then((res) => res);
        },
        sendFeedBack:(deviceUUID, feedBack, best_player)=>{
            console.log("in api sendFeedBack- deviceUUID: ", deviceUUID," feedBack: ",feedBack," best_player: ",best_player);
            return axios.post(address + `/feedback/addFeedback/${deviceUUID}/${feedBack}/${best_player}`).then((res) => res);
        },
        sendPressTimeStamp:(deviceUUID,playerTimeStampArr, agentTimeStampArr, experimentInfo)=>{
            // console.log("in api sendPressTimeStamp- ", "deviceUUID:", deviceUUID, " playerTimeStampArr: ", playerTimeStampArr," agentTimeStampArr: ",agentTimeStampArr, "experimentInfo: ",experimentInfo);
            // console.log(pressTimeArr.length)
            return axios.post(address + `/actions/addAction/${deviceUUID}/${playerTimeStampArr}/${agentTimeStampArr}/${experimentInfo}`).then((res) => res);
        },
    }

}
export default createApiClient();