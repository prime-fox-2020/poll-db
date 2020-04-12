'use strict'
const Table = require('cli-table')
const colors = require('colors')
const fs = require('fs')
const { Client } = require('pg')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'poll_db',
  password: 'admin',
  port: 5432,
})

client.connect()

client.query(`SELECT name, party, grade_current
  FROM politicians
  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;`, (err, res) => {
    if (err) throw err
    const table = new Table({
      head: ['Politicians Name'.rainbow.bgBlack, 'Party'.rainbow.bgBlack, 'Grade Current'.rainbow.bgBlack],
      colWidths: [30, 10, 30]
    })
    res.rows.forEach(el => {
      table.push([el.name.rainbow.bgBlack, el.party.rainbow.bgBlack, el.grade_current])
    })
    console.log(table.toString())
  }
)

client.query(`SELECT COUNT(politicians.id) AS total, politicians.name
  FROM votes JOIN politicians
  ON votes.politician_id = politicians.id
  WHERE politicians.name = 'Olympia Snowe'
  GROUP BY politicians.name;`, (err, res) => {
    if (err) throw err
    const table = new Table({
      head: ['Total Vote'.rainbow.bgBlack, 'Politician Name'.rainbow.bgBlack],
      colWidths: [20, 30]
    })
    table.push([res.rows[0].total.rainbow.bgBlack, res.rows[0].name.rainbow.bgBlack])
    console.log(table.toString())
  }
)

client.query(`SELECT politicians.name, COUNT(politicians.id) AS total
  FROM votes JOIN politicians
  ON votes.politician_id = politicians.id
  WHERE politicians.name LIKE 'Adam%'
  GROUP BY politicians.name;`, (err, res) => {
    if (err) throw err
    const table = new Table({
      head: ['Politicians Name'.rainbow.bgBlack, 'Total Vote'.rainbow.bgBlack],
      colWidths: [30, 20]
    })
    res.rows.forEach(el => {
      table.push([el.name.rainbow.bgBlack, el.total.rainbow.bgBlack])
    })
    console.log(table.toString())
  }
)

client.query(`SELECT COUNT(politicians.id) AS total, politicians.name, politicians.party, politicians.location
  FROM votes JOIN politicians
  ON votes.politician_id = politicians.id
  GROUP BY politicians.name, politicians.party, politicians.location
  ORDER BY COUNT(politicians.id) DESC
  LIMIT 3;`, (err, res) => {
    if (err) throw err
    const table = new Table({
      head: ['Total Vote'.rainbow.bgBlack, 'Politicians Name'.rainbow.bgBlack, 'Party'.rainbow.bgBlack, 'Location'.rainbow.bgBlack],
      colWidths: [20, 30, 15, 25]
    })
    res.rows.forEach(el => {
      table.push([el.total.rainbow.bgBlack, el.name.rainbow.bgBlack, el.party.rainbow.bgBlack, el.location.rainbow.bgBlack])
    })
    console.log(table.toString())
  }
)

client.query(`SELECT DISTINCT voters.first_name AS fn, voters.last_name AS ln, voters.gender, voters.age 
  FROM voters, votes, politicians
  WHERE voters.id = votes.voter_id
    AND politicians.id = votes.politician_id
    AND politicians.name = 'Olympia Snowe';`, (err, res) => {
    if (err) throw err
    const table = new Table({
      head: ['First Name'.rainbow.bgBlack, 'Last Name'.rainbow.bgBlack, 'Gender'.rainbow.bgBlack, 'Age'.rainbow.bgBlack],
      colWidths: [20, 30, 15, 25]
    })
    res.rows.forEach(el => {
      table.push([el.fn.rainbow.bgBlack, el.ln.rainbow.bgBlack, el.gender.rainbow.bgBlack, el.age])
    })
    console.log(table.toString())
    client.end()
  }
)