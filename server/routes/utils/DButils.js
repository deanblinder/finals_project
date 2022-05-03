require("dotenv").config();
const sql = require("mssql");

const config = {
    server: 'localhost',
    port:1433,
    authentication: {
        type: 'default',
        options: {
            userName: 'syncAdmin', //update me
            password: 'A12345a!'  //update me
        }
    },
    options: {
        database: 'project_DB',
        instanceName: 'SQLEXPRESS',
        encrypt: false,
    }
};
console.log(config)
const pool = new sql.ConnectionPool(config);
console.log("after sql connection");
const poolConnect = pool.connect();
console.log("after pool.connect")

exports.execQuery = async function (query) {
    console.log("in execQuery")
    await poolConnect;
    try {
        console.log("in try arter poolConnect")
        var result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        throw err;
    }
};



