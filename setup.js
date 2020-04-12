
const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'xxxaber321',
    port: 5432,
  })
  client.connect()

  client.query(`
  CREATE TABLE IF NOT EXISTS politicians(
    id SERIAL PRIMARY KEY,
    nama VARCHAR(30),
    partai VARCHAR(20),
    location VARCHAR(20),
    grade_current INTEGER
  )`, (err, res) => {
    console.log(err, res)
  })

  client.query(`
  CREATE TABLE IF NOT EXISTS voters(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    gender VARCHAR(20),
    age INTEGER
  )`, (err, res) => {
    console.log(err, res)
  })

  client.query(`
  CREATE TABLE IF NOT EXISTS votes(
    id SERIAL PRIMARY KEY,
    voter_id INTEGER,
    politician_id INTEGER
  )`, (err, res) => {
    console.log(err, res)
    client.end()
  })