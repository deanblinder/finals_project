const DButils = require("./DButils");

// async function getAdminByAdminName(name) {
//     console.log(" in getAdminByAdminName")
//     return await DButils.execQuery(
//         `select * from admin where admin_name='${name}'`
//     );
// }
//
// async function getAdminByEmail(email) {
//     console.log(" in getAdminByEmail")
//     return await DButils.execQuery(
//         `select * from admin where email='${email}'`
//     );
// }


async function addAdmin(name,password) {
    console.log(" in addAdmin")
    await DButils.execQuery(
        `INSERT INTO admin VALUES ('${name}','${password}')`
    );
}
async function administratorLogin(name,password) {
    return await DButils.execQuery(
        `SELECT * FROM admin WHERE admin_name='${name}' and  password='${password}'`
    );
}

async function deleteAdminByUserName(name) {
    console.log(" in deleteAdminByUserName")
    await DButils.execQuery(
        `DELETE FROM admin where admin_name='${name}'`
    );
}

// exports.getAdminByAdminName= getAdminByAdminName;
// exports.getAdminByEmail= getAdminByEmail;
exports.addAdmin= addAdmin;
exports.deleteAdminByUserName= deleteAdminByUserName;
exports.administratorLogin =administratorLogin;