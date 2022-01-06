const DButils = require("./DButils");

async function getUserById(user_id) {
    return await DButils.execQuery(
        `select * from Users where id='${user_id}'`
    );
}

async function addUser(id,email, age,gender, model,version ) {
    console.log(" in addUser")
    await DButils.execQuery(
        `INSERT INTO Users VALUES ('${id}','${email}','${age}','${gender}', '${model}', '${version}' )`
    );
}

exports.getUserById= getUserById;
exports.addUser= addUser;