//your code here
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_poll',
    password: 'bismillah',
    port: 5432,
})


let tblPolliticians = `CREATE TABLE politicians (
    id serial PRIMARY KEY,
    name VARCHAR (50),
    party VARCHAR (50),
    location VARCHAR (50),
    grade_current VARCHAR (50))`

let tblVoters = `CREATE TABLE voters (
        id serial PRIMARY KEY,
        first_name VARCHAR (50),
        last_name VARCHAR (50),
        gender VARCHAR (50),
        age INTEGER)`

let tblVotes = `CREATE TABLE votes (
            id serial PRIMARY KEY,
            voterId INTEGER,
            politicianId INTEGER)`

client.connect()
client.query(tblPolliticians, (err, res) => {
    if (err) {
        console.log(err)
        client.end()
    } else {
        console.log('created table politicians');
        client.query(tblVoters, (err, res) => {
            if (err) {
                console.log(err)
                client.end()
            } else {
                console.log('created table voters');
                client.query(tblVotes, (err, res) => {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log('created table votes');
                    }
                    client.end()
                })
            }
        })
    }
})