//your code here

// CREATE TABLE

const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password123',
    port: 5432,
})

client.connect() // ===========================================================

// ===============
//   RELEASE 0
// ===============

// CREATE TABLE politicians, voters, votes
const politicians = `
                    CREATE TABLE IF NOT EXISTS politicians(
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(20),
                        party VARCHAR(20),
                        location VARCHAR(20),
                        grade_current FLOAT
                    )
                    `
const voters = `
                CREATE TABLE IF NOT EXISTS voters(
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(150),
                    last_name VARCHAR(150),
                    gender VARCHAR(150),
                    age INTEGER
                )
                `
const votes = `
                CREATE TABLE IF NOT EXISTS votes(
                    id SERIAL PRIMARY KEY,
                    voter_id INTEGER,
                    politician_id INTEGER
                )
                `
        
                


// client.query(politicians, (err, res) => {
//     if (err) console.log(err)

//     console.log(res)
//     client.end()
// })

// client.query(voters, (err, res) => {
//     if (err) console.log(err)

//     console.log(res)
//     client.end()
// })

// client.query(votes, (err, res) => {
//     if (err) console.log(err)

//     console.log(res)
//     client.end()
// })

