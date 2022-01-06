const DButils = require("./DButils");

async function isUserExists(uuid) {
    console.log(" in getUserById")
    const user =  await DButils.execQuery(
        `select * from Users where id='${uuid}'`
    );
    if (user.length > 0)
        return false;
    return true;
}

exports.isUserExists= isUserExists;