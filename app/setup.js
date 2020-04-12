const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db-poll',
    password: 'postgres',
    port: 5432,
})
client.connect()

client.query(`CREATE TABLE IF NOT EXISTs politicians (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    party VARCHAR(15),
    location VARCHAR(15),
    grade_current REAL
)
`, (err, res) => {
    if(err){
        console.log(err)
        client.end()
    }
    else{
        console.log('Table politicans created')
        client.query(`CREATE TABLE IF NOT EXISTS voters (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(15),
            last_name VARCHAR(15),
            gender VARCHAR(10),
            age INTEGER
        )
        `, (err,res) => {
            if(err){
                console.log(err)
                client.end()
            }
            else{
                console.log('Table voters created')
                client.query(`CREATE TABLE IF NOT EXISTS votes (
                    id SERIAL PRIMARY KEY,
                    voterId SERIAL,
                    politicianId SERIAL
                )
                `, (err, res) => {
                    if(err){
                        console.log(err)
                        client.end()
                    }
                    else{
                        console.log('Table votes created')
                    }
                    client.end()
                })
            }
        })
    }
})
