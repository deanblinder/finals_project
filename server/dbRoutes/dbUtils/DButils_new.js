require("dotenv").config();
const sql = require("mssql");

const config = {
    server: process.env.server,
    database: process.env.database,
    options: {
        trustedConnection: true,
        enableArithAbort: true,
        instanceName: 'ISE-INTNET-W39 '
    },
    port:3039
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