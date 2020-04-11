//your code here
const client = require('./connection.js')

client.query(`
    CREATE TABLE IF NOT EXISTS politicians (
        id_politicians serial PRIMARY KEY,
        name VARCHAR (50),
        partai VARCHAR (50), 
        location VARCHAR (50),
        grade_current FLOAT
    )
` , (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log('success')
    }
})

const queryVoters = `
    CREATE TABLE IF NOT EXISTS voters (
        id_voters serial PRIMARY KEY,
        first_name VARCHAR(50),
        last_name VARCHAR(50),
        gender VARCHAR(50),
        age INTEGER
    )
`

client.query(queryVoters, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log('success')
    }
})

client.query(`
    CREATE TABLE IF NOT EXISTS votes (
        id_votes serial PRIMARY KEY,
        id_voters INTEGER REFERENCES voters(id_voters),
        id_politicians INTEGER REFERENCES politicians(id_politicians)
    )
`, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log('success')
        client.end()
    }
})

