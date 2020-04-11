const client = require ('./connection')

const tablePoliticians = `CREATE TABLE IF NOT EXISTS politicians (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30),
  party VARCHAR(5),
  location VARCHAR(5),
  grade_current FLOAT
)`

const tableVoter = `CREATE TABLE IF NOT EXISTS voter (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(20),
  last_name VARCHAR(20),
  gender VARCHAR(10),
  age INTEGER
)`

const tableVotes = `CREATE TABLE IF NOT EXISTS votes (
  id SERIAL PRIMARY KEY,
  voter_id INTEGER,
  politician_id INTEGER
)`

client.query(tablePoliticians, (err, res) => {
  if(err) {
    console.log(err)
  } else {
    client.query(tableVoter, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        client.query(tableVotes, (err, res) => {
          if(err) {
            console.log(err)
          } else {
            console.log(res)
            client.end()
          }
        })
      }
    })
  }
})

