const {Client} = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: 'admin',
  port: 5432,
})

client.connect()

client.query(`CREATE TABLE IF NOT EXISTS candidates(
  id SERIAL PRIMARY KEY,
  name VARCHAR (40),
  party VARCHAR (70),
  location VARCHAR (30),
  grade_current REAL
)`, (err, res) => {
  if (err) {
    console.log(err)
  }
})

client.query(`CREATE TABLE IF NOT EXISTS voters(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (20),
  last_name VARCHAR (20),
  gender VARCHAR (6),
  age real
)`, (err, res) => {
  if (err) {
    console.log(err)
  }
})

client.query(`CREATE TABLE IF NOT EXISTS votes(
  id SERIAL PRIMARY KEY,
  voter_id INTEGER,
  candidate_id INTEGER
)`, (err, res) => {
  if (err) {
    console.log(err)
  }
  client.end()
})

