const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass',
  port: 5432,
})

client.connect()

client.query(`
  CREATE TABLE IF NOT EXISTS politicians (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    party VARCHAR(20),
    location VARCHAR(20),
    grade_current DECIMAL
  )
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.command);
})

client.query(`
  CREATE TABLE IF NOT EXISTS voters (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    gender VARCHAR(20),
    age INTEGER
  )
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.command);
})

client.query(`
  CREATE TABLE IF NOT EXISTS votes (
    voterId INTEGER,
    politicianId INTEGER
  )
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.command);
  client.end()
})