import axios from 'axios';
import axios_o from 'axios'

const events_data = [];
const address = "https://syncProject.cs.bgu.ac.il:443"
// const address = 'http://192.168.179.35:3232'
// const address = 'http://192.168.1.235:3232'
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
        sendFeedBack:(deviceUUID, feedBack, best_player)=>{
            console.log("in api sendFeedBack- deviceUUID: ", deviceUUID," feedBack: ",feedBack," best_player: ",best_player);
            return axios.post(address + `/feedback/addFeedback/${deviceUUID}/${feedBack}/${best_player}`).then((res) => res);
        },
        sendPressTimeStamp:(deviceUUID,playerTimeStampArr, agentTimeStampArr, experimentInfo)=>{
            // console.log("in api sendPressTimeStamp- ", "deviceUUID:", deviceUUID, " playerTimeStampArr: ", playerTimeStampArr," agentTimeStampArr: ",agentTimeStampArr, "experimentInfo: ",experimentInfo);
            // console.log(pressTimeArr.length)
            return axios.post(address + `/actions/addAction/${deviceUUID}/${playerTimeStampArr}/${agentTimeStampArr}/${experimentInfo}`).then((res) => res);
        },
        numberOfExistingMail: async (mail)=> {
            const aa = await axios_o.get(address + `/users/numberOfExistingMails/${mail}`)
                .then(response => response)
                .catch(error => error)

            return aa.data
        },
    }

}
export default createApiClient();