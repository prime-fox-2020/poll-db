const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'polldb',
    password: 'hacktiv',
    port: 5432,
})

module.exports = client