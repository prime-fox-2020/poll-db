//your code here
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'template',
    password: '12345678',
    port: 5432,
})

client.connect()

client.query(`
    CREATE TABLE IF NOT EXISTS pejabat(
        ID serial PRIMARY KEY,
        name VARCHAR,
        party VARCHAR,
        location VARCHAR,
        grade_current REAL
    )
`, (err, res) => {
    if (err) console.log(err)

    console.log(res)
})

client.query(`
    CREATE TABLE IF NOT EXISTS voters(
        ID SERIAL PRIMARY KEY,
        first_name VARCHAR,
        last_name VARCHAR,
        gender VARCHAR,
        age INTEGER
    )
`, (err, res) => {
    if (err) console.log(err)

    console.log(res)
})

client.query(`
    CREATE TABLE IF NOT EXISTS votes(
        ID SERIAL PRIMARY KEY,
        voters_ID INTEGER,
        pejabat_ID INTEGER,
        FOREIGN KEY (pejabat_ID) REFERENCES pejabat(ID),
        FOREIGN KEY (voters_ID) REFERENCES voters(ID)
    )
`, (err, res) => {
    if (err) console.log(err)

    console.log(res)
    client.end()
})