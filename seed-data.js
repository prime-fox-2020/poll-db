'use strict'
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

class Pool {
  static addPoliticians() {
    let query_body = `INSERT INTO politicians (name, party, location, grade_current) VALUES `
    const politicians = fs.readFileSync('./politicians.csv', 'utf8')
      .split(/\r\n|\n/g)
      .slice(1)
      .map(el => el.split(','))
      .filter(el => el[0] !== '')

    for (const [i, [name, party, location, grade_current]] of politicians.entries()) {
      query_body += `('${name}', '${party}', '${location}', '${grade_current}')`
      if (i < politicians.length - 1) query_body += ', '
    }

    client.query(query_body, (err, res) => {
      if (err) throw err
      console.log(res)

    })
  }

  static addVoters() {
    let query_body = `INSERT INTO voters (first_name, last_name, gender, age) VALUES `
    const voters = fs.readFileSync('./voters.csv', 'utf8')
      .split(/\r\n|\n/g)
      .slice(1)
      .map(el => el.split(','))
      .filter(el => el[3] > 17)

    for (const [i, [first_name, last_name, gender, age]] of voters.entries()) {
      query_body += `('${first_name}', '${last_name}', '${gender}', '${age}')`
      if (i < voters.length - 1) query_body += ', '
    }

    client.query(query_body, (err, res) => {
      if (err) throw err
      console.log(res)
    })
  }

  static addVotes() {
    let query_body = `INSERT INTO votes (voter_id, politician_id) VALUES `
    const votes = fs.readFileSync('./votes.csv', 'utf8')
      .split(/\r\n|\n/g)
      .slice(1)
      .map(el => el.split(','))
      .filter(el => el[0] !== '' && el[1] !== '')


    for (const [i, [voter_id, politician_id]] of votes.entries()) {
      query_body += `('${voter_id}', '${politician_id}')`
      if (i < votes.length - 1) query_body += ', '
    }

    client.query(query_body, (err, res) => {
      if (err) throw err
      console.log(res)
      client.end()
    })
  }
}

Pool.addPoliticians()
Pool.addVoters()
Pool.addVotes()