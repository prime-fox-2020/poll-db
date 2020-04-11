//your code here
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'sonyma2903',
  port: 5432,
})

client.connect()

client.query('SELECT NOW()', (err, res) => {
  if (err) console.log(err)

  console.log(res)
})

client.query(`
    CREATE TABLE IF NOT EXISTS politicians(
        id_politicians SERIAL PRIMARY KEY,
        name VARCHAR(30),
        party VARCHAR(5),
        location VARCHAR(5),
        grade_current INTEGER
    )
`, (err, res) => {
  if (err) console.log(err)

  console.log(res)
})

client.query(`
    CREATE TABLE IF NOT EXISTS voters(
        id_voters SERIAL PRIMARY KEY,
        first_name VARCHAR(15),
        last_name VARCHAR(15),
        gender VARCHAR(10),
        age INTEGER
    )
`, (err, res) => {
  if (err) console.log(err)

  console.log(res)
})

client.query(`
    CREATE TABLE IF NOT EXISTS votes(
      id_votes SERIAL PRIMARY KEY,
      voterId INT,
      politicianId INT
    )
`, (err, res) => {
  if (err) console.log(err)

  console.log(res)
  client.end()
})