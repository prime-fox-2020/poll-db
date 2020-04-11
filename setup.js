const {Client} = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

client.connect()

client.query(`
CREATE TABLE IF NOT EXISTS politicians(
  id SERIAL PRIMARY KEY,
  name VARCHAR(20),
  party VARCHAR(20),
  location VARCHAR(20),
  grade_current REAL
)
`, (err, res) => {
  if(err) console.log(err)
  
  console.log(res)
})

client.query(`
CREATE TABLE IF NOT EXISTS voters(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(25),
  gender VARCHAR(10),
  age INTEGER
)
`, (err, res) => {
  if(err) console.log(err)
  
  console.log(res)
})

client.query(`
CREATE TABLE IF NOT EXISTS votes(
  id SERIAL PRIMARY KEY,
  voterId INTEGER,
  politicianId INTEGER
)
`, (err, res) => {
  if(err) console.log(err)

  console.log(res)
  client.end()
})