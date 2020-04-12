'use strict'
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'poll_db',
  password: 'admin',
  port: 5432,
})

client.connect()

client.query(`CREATE TABLE IF NOT EXISTS politicians(
  id SERIAL PRIMARY KEY,
  name VARCHAR (40),
  party VARCHAR (70),
  location VARCHAR (30),
  grade_current REAL
)`, (err, res) => {
  if (err) {
    throw err
  }
  console.log(res)
})

client.query(`CREATE TABLE IF NOT EXISTS voters(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR (20),
  last_name VARCHAR (20),
  gender VARCHAR (6),
  age real
)`, (err, res) => {
  if (err) {
    throw err
  }
  console.log(res)
})

client.query(`CREATE TABLE IF NOT EXISTS votes(
  id SERIAL PRIMARY KEY,
  voter_id INTEGER,
  politician_id INTEGER)`, (err, res) => {
  if (err) {
    throw err
  }
  console.log(res)
  client.end()
})