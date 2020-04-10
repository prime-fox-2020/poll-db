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
        
        console.log(res)
        
    })
    
    client.query(`
      CREATE TABLE IF NOT EXISTS politicians(
          id SERIAL PRIMARY KEY,
          name VARCHAR(30),
          partai VARCHAR(20),
          location VARCHAR(30),
          grade_current NUMERIC(30)
            )
    `, (err, res) => {
        if(err) console.log(err)

        console.log(res)
    })


    client.query(`
      CREATE TABLE IF NOT EXISTS Vote(
          id SERIAL PRIMARY KEY,
          voters_id INTEGER,
          politicians_id INTEGER)
    `, (err, res) => {
        if(err) console.log(err)

        console.log(res)
        client.end()
    })



