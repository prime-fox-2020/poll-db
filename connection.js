const {Client} = require ('pg');

client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'vii97',
    database: 'postgres',
    port: 5432
});

module.exports = client 

