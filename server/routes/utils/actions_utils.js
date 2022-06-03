const DButils = require("./DButils");

// async function getActionByUserId(userId) {
//     return await DButils.execQuery(
//         `select * from action where user_session_id='${userId}'`
//     );
// }

// async function getSessionIdByUserId(userId) {
//     return await DButils.execQuery(
//         `select session_id from action where user_session_id='${userId}'`
//     );
// }

async function addAction(user_session_id, user_press_time,agent_press_time,experiment_info) {
    console.log("add action")
    await DButils.execQuery(
        `INSERT INTO action (user_session_id,user_press_time,agent_press_time,experiment_info) VALUES ('${user_session_id}','${user_press_time}','${agent_press_time}','${experiment_info}')`
        );
    return 200
    // }
}


exports.getActionByUserId= getActionByUserId;
exports.getSessionIdByUserId = getSessionIdByUserId;
exports.addAction= addAction;
