//your code here
const { Client } = require('pg')
const client = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'template',
    password : 'postgres',
    port : 5432, 
})

client.connect()

let text = `CREATE TABLE IF NOT EXISTS candidate (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(50),
    party VARCHAR(10),
    location VARCHAR(10),
    grade_current REAL
);`
client.query(text, (err, res) => {
    console.log(err, res)
})

let text2 = `CREATE TABLE IF NOT EXISTS voter (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(20),
    lastname VARCHAR(20),
    gender VARCHAR(10),
    age INTEGER
);`
client.query(text2, (err, res) => {
    console.log(err, res)
})

let text3 = `CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    voterID INTEGER,
    candidateID INTEGER
);`
client.query(text3, (err, res) => {
    console.log(err, res)
    client.end()
})