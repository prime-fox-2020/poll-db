//your code here
const client = require('./connection')

client.query(`
    CREATE TABLE IF NOT EXISTS politicians (
        id_politicians serial PRIMARY KEY,
        name VARCHAR (50),
        partai VARCHAR (50), 
        location VARCHAR (50),
        grade_current FLOAT
    )
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.log(res)
    }
})

client.query(`
    CREATE TABLE IF NOT EXISTS voters (
        id serial PRIMARY KEY,
        first_name VARCHAR (50),
        last_name VARCHAR (50),
        gender VARCHAR (50),
        age INTEGER
    )
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.log(res)
    }
})

client.query(`
    CREATE TABLE IF NOT EXISTS votes (
        id serial PRIMARY KEY,
        voter_id INTEGER,
        politician_id INTEGER
    )
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.log(res)
    }
})