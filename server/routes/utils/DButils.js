require("dotenv").config();
const sql = require("mssql");

const config = {
    server: process.env.tedious_server,
    database: process.env.tedious_database,
    options: {
        trustedConnection: true,
        enableArithAbort: true
    },
};

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

exports.execQuery = async function (query) {
    await poolConnect;
    try {
        var result = await pool.request().query(query);
        return result.recordset;
    } catch (err) {
        console.error("SQL error", err);
        throw err;
    }
};