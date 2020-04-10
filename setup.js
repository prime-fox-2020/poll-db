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
      CREATE TABLE IF NOT EXISTS Pemilih(
          id SERIAL PRIMARY KEY,
          First_name VARCHAR(20),
          Last_name VARCHAR(25),
          Gender VARCHAR(10),
          Age INTEGER)
    `, (err, res) => {
        if(err) console.log(err)
        
        console.log(res)
        
    })
    
    client.query(`
      CREATE TABLE IF NOT EXISTS Pejabat(
          id SERIAL PRIMARY KEY,
          Name VARCHAR(30),
          Partai VARCHAR(20),
          Location VARCHAR(30),
          Grade_current NUMERIC(30)
            )
    `, (err, res) => {
        if(err) console.log(err)

        console.log(res)
    })


    client.query(`
      CREATE TABLE IF NOT EXISTS Vote(
          id SERIAL PRIMARY KEY,
          Pemilih_id INTEGER,
          Pejabat_id INTEGER)
    `, (err, res) => {
        if(err) console.log(err)

        console.log(res)
        client.end()
    })



