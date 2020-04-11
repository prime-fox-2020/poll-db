//your code here

const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres123',
    port: 5432,
  })

  client.connect()

  client.query(`
      CREATE TABLE IF NOT EXISTS voters(
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(20),
          last_name VARCHAR(25),
          gender VARCHAR(10),
          age INTEGER)
    `, (err, res) => {
        if(err) console.log(err)
        
        // console.log(res) // Dimatikan Karna tidak perlu dimunculkan
        
    })
    
    client.query(`
      CREATE TABLE IF NOT EXISTS politicians(
          id SERIAL PRIMARY KEY,
          name VARCHAR(30),
          partai VARCHAR(20),
          location VARCHAR(30),
          grade_current REAL
            )
    `, (err, res) => {
        if(err) console.log(err)

        // console.log(res) // Dimatikan Karna tidak perlu dimunculkan
    })


    client.query(`
      CREATE TABLE IF NOT EXISTS Vote(
          id SERIAL PRIMARY KEY,
          voters_id INTEGER,
          politicians_id INTEGER)
    `, (err, res) => {
        if(err) console.log(err)
        // client.end()
        // console.log(res) // Dimatikan Karna tidak perlu dimunculkan
    })




    // RELEASE 2:
    // 1.
    client.query(`
    SELECT name,partai,grade_current
    FROM politicians
    WHERE partai = 'R' AND grade_current BETWEEN 9 AND 11
  `, (err, res) => {
      if(err) console.log(err)

      console.table(res.rows)
    //   client.end()
  })


//   2.
  client.query(`
    SELECT COUNT(*) AS "totalVote", politicians.name
    FROM politicians 
    JOIN vote
    ON politicians.id = vote.politicians_id
    WHERE politicians.name = 'Olympia Snowe'
    GROUP BY politicians.name 

  `, (err, res) => {
      if(err) console.log(err)

      console.table(res.rows)
    //   client.end()
  })


//  3.
client.query(`
    SELECT politicians.name, COUNT(*) AS totalVote
    FROM politicians 
    JOIN vote
    ON politicians.id = vote.politicians_id
    WHERE politicians.name LIKE '%Adam%'
    GROUP BY politicians.name 

  `, (err, res) => {
      if(err) console.log(err)

      console.table(res.rows)
    //   client.end()
  })


//  4.
client.query(`
    SELECT COUNT(*) AS totalVote,politicians.name,politicians.partai,politicians.location 
    FROM politicians 
    JOIN vote
    ON politicians.id = vote.politicians_id
    GROUP BY politicians.name,politicians.partai,politicians.location 
    ORDER BY COUNT(*) DESC
    LIMIT 3

  `, (err, res) => {
      if(err) console.log(err)

      console.table(res.rows)
    //   client.end()
  })

// 5.
client.query(`
    SELECT voters.first_name, voters.last_name, voters.gender, voters.age
    FROM voters
    JOIN vote
    ON voters.id = vote.voters_id
    JOIN politicians
    ON politicians.id = vote.politicians_id
    WHERE politicians.name = 'Olympia Snowe'

  `, (err, res) => {
      if(err) console.log(err)

      console.table(res.rows)
      client.end()
  })




