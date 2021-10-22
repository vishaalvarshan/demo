const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
    host: "l1-propel.ctqnawjozhfg.ap-southeast-2.rds.amazonaws.com",
    user: "vishaal",
    password: "vishaal",
    database:"vishaal"
};

const pool = mysql.createPool(dbConfig);

const query = async(sql, params) => {
    const connection = await pool.getConnection();

    const [results, ] = await connection.execute(sql, params);
    connection.release();
    return results;
}

module.exports = {query};