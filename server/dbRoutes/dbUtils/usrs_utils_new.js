const DButils = require('DButils_new');

async function getUserById(user_id) {
    console.log(" in getUserById")
    return await DButils.execQuery(
        `select * from Users where id='${user_id}'`
    );
}
async function getUserByEmail(email) {
    console.log(" in getUserByEmail")
    return await DButils.execQuery(
        `select * from Users where email='${email}'`
    );
}

async function getUserIdByUUID(uuid) {
    console.log(" in getUserByEmail")
    return await DButils.execQuery(
        `select user_id from Users where uuid='${uuid}'`
    );
}

async function addUser(id,email, age,gender, model,version ) {
    console.log("in addUser")
    await DButils.execQuery(
        `INSERT INTO Users VALUES ('${id}','${email}','${age}','${gender}', '${model}', '${version}' )`
    );
}

async function deleteUserByEmail(email) {
    console.log(" in delete user")
    await DButils.execQuery(
        `DELETE FROM Users where email='${email}'`
    );
}

exports.getUserById= getUserById;
exports.getUserByEmail= getUserByEmail;
exports.getUserIdByUUID= getUserIdByUUID;
exports.addUser= addUser;
exports.deleteUserByEmail= deleteUserByEmail;