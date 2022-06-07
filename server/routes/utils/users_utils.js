const DButils = require("./DButils");

async function getUserById() {
    console.log(" in getUserById")
    return await DButils.execQuery(
        '* from Users'
    );
}
async function getUserByEmail(email) {
    console.log(" in getUserByEmail")
    return await DButils.execQuery(
        `select * from Users where email='${email}'`
    );
}

async function getUserIdByEmail(email) {
    console.log(" in getUserIdByEmail")
    return await DButils.execQuery(
        `select email from Users where email like '${email}%'`
    );
}

async function addUser(email, age,gender,version ) {
    console.log("in addUser")
    await DButils.execQuery(
        `INSERT INTO Users VALUES ('${email}','${age}','${gender}', '${version}' )`
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
exports.getUserIdByEmail= getUserIdByEmail;
exports.addUser= addUser;
exports.deleteUserByEmail= deleteUserByEmail;