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

async function getUserIdByModel(model) {
    console.log(" in getUserIdByUUID")
    return await DButils.execQuery(
        `select id from Users where model like '${model}%'`
    );
}

async function addUser(email, age,gender, model,version ) {
    console.log("in addUser")
    await DButils.execQuery(
        `INSERT INTO Users VALUES ('${email}','${age}','${gender}', '${model}', '${version}' )`
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
exports.getUserIdByModel= getUserIdByModel;
exports.addUser= addUser;
exports.deleteUserByEmail= deleteUserByEmail;