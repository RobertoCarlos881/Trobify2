const mysql = require('mysql');
const { promisify }= require('util');

let database = {
    connectionLimit: 100,
    host: 'localhost',
    port: '3306',
    database: 'trobify',
    user: 'roberto',
    password: '123456',
}

const pool = mysql.createPool(database);

pool.getConnection((err,connection) => {
    if (err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONECTION WAS REFUSED');
        }
    }
    if (connection) connection.release();
    console.log('DB is Connected');
    return;
});

pool.query = promisify(pool.query);

module.exports = pool;

