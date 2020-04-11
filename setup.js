//your code here
const {Client} = require('pg')

const client = new Client({
  user: `postgres`,
  host: `localhost`,
  database: `postgres`,
  password: `12345`,
  port : 5432,
})

client.connect()

client.query(`
  CREATE TABLE IF NOT EXISTS politician ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    party VARCHAR,
    location VARCHAR,
    grade_current REAL
  )
`, (err,res)=>{
  if (err) console.log(err);

  console.log(res);
})

client.query(`
  CREATE TABLE IF NOT EXISTS voters ( 
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    gender VARCHAR,
    age INTEGER
  )
`, (err,res)=>{
  if (err) console.log(err);

  console.log(res);
})

client.query(`
  CREATE TABLE IF NOT EXISTS votes ( 
    id SERIAL PRIMARY KEY,
    voters_id INTEGER,
    pejabat_id INTEGER
    )
`, (err,res)=>{
  if (err) console.log(err);

  console.log(res);
  client.end()
})

