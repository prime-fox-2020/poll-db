const { Client } = require('pg');


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'xxxaber321',
    port: 5432,
})
client.connect()

client.query(`
  SELECT nama, partai, grade_current
  FROM politicians
  WHERE partai = 'R' AND grade_current BETWEEN 9 AND 11
`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})


client.query(`
  SELECT COUNT(politicians.id) AS total, politicians.nama
  FROM votes JOIN politicians
  ON votes.politician_id = politicians.id
  WHERE politicians.nama = 'Olympia Snowe'
  GROUP BY politicians.nama
`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})


client.query(`
  SELECT politicians.nama, COUNT(politicians.id) AS total
  FROM votes JOIN politicians
  ON votes.politician_id = politicians.id
  WHERE politicians.nama LIKE 'Adam%'
  GROUP BY politicians.nama
  `, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})


client.query(`
  SELECT COUNT(politicians.id) AS total, politicians.nama, politicians.partai, politicians.location
  FROM votes JOIN politicians
  ON votes.politician_id = politicians.id
  GROUP BY politicians.nama, politicians.partai, politicians.location
  ORDER BY COUNT(politicians.id) DESC
  LIMIT 3
  `, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})


client.query(`
  SELECT DISTINCT voters.first_name AS fn, voters.last_name AS ln, voters.gender, voters.age 
  FROM voters, votes, politicians
  WHERE voters.id = votes.voter_id
  AND politicians.id = votes.politician_id
  AND politicians.nama = 'Olympia Snowe'
  `, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.table(res.rows)
        client.end();
    }
})