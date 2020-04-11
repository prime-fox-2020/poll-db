const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_poll',
    password: 'admin',
    port: 5432,
})

module.exports = client;
