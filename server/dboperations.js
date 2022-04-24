var config = require('./dbconfig')
const sql = require('mssql')
const e = require("express");

async function getUsers(){
    try{
        let pool = await sql.connect(config);
        console.log('-------------')
        let q = await pool.request().query('select * from Users');
        return q.recordsets;
    }
    catch(error) {
        console.log(error)
    }
}

module.exports= {
    getUsers:getUsers
}