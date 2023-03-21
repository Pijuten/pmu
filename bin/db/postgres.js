const { Pool } = require('pg');

const pool  = new Pool({
    user: 'swen1user',
    database: 'postgres',
    password: 'swen1psw',
    port: 5432,
    host: 'localhost',
});

module.exports = {pool}