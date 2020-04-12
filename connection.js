//your code here
const { Client } = require('pg')

// create semua table
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'DB_Test',
    password: 'admin',
    port: 5432,
  })
client.connect()

module.exports = client

