//your code here
const {Client}=require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'poll_db',
    password: '',
    port: 5432,
  })
client.connect()


client.query(`
    CREATE TABLE IF NOT EXISTS politicians(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30),
        party VARCHAR(15),
        location VARCHAR(30),
        grade_current FLOAT
    )`
, (err, res) => {
    console.log(err,res)
  })

client.query(`
    CREATE TABLE IF NOT EXISTS voters(
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(15),
        last_name VARCHAR(15),
        gender VARCHAR(15),
        age INTEGER
    )`
, (err, res) => {
    console.log(err,res)
})

client.query(`
  CREATE TABLE IF NOT EXISTS politician_voter(
      id SERIAL PRIMARY KEY,
      voter_id INTEGER,
      politician_id INTEGER,
      FOREIGN KEY (voter_id) REFERENCES voters(id),
      FOREIGN KEY (politician_id) REFERENCES politicians(id)
  )`
, (err, res) => {
  console.log(err,res)
  client.end()
})

