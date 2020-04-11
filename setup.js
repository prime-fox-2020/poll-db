//your code here
'use strict'

const { Client } = require('pg');

const client = new Client({
  user: 'pipop',
  host: 'localhost',
  database: 'pollDB',
  password: 'qwerty1234',
  port: 5432,
})

client.connect();

client.query(`
  CREATE TABLE IF NOT EXISTS politicians(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    party CHAR,
    location VARCHAR(5),
    grade_current REAL
  )
`, (err, res) => {
  console.log(err, res)
});

client.query(`
  CREATE TABLE IF NOT EXISTS voters(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(20),
    last_name VARCHAR(20),
    gender VARCHAR(6),
    age INTEGER
  )
`, (err, res) => {
  console.log(err, res)
});

client.query(
  `
  CREATE TABLE IF NOT EXISTS votes(
    id SERIAL PRIMARY KEY,
    voterId SERIAL,
    politicianId SERIAL,
    FOREIGN KEY (politicianId) REFERENCES politicians(id),
    FOREIGN KEY (voterId) REFERENCES voters(id)
  )
`
, (err, res) => {
  console.log(err, res)
  client.end()
});