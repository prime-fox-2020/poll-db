const {Client}=require('pg')
const fs=require('fs')


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'poll_db',
    password: '',
    port: 5432,
  })
client.connect()

//release 2 no 1

client.query(`
  SELECT 
  name,
  party,
  grade_current 
  FROM politicians WHERE grade_current BETWEEN 9 AND 11 AND party = 'R'
`,(err,data)=>{
    if(err)console.log(err)
    const Table = require('cli-table');
    const table = new Table();
    table.push(['Name','Party','Grade_current'])
    for (let i = 0; i < data.rows.length; i++) {
      table.push([data.rows[i].name,data.rows[i].party,data.rows[i].grade_current])
      
    }
    console.log(table.toString());
    // console.log(data.rows)
    // client.end()
})

//release 2 no 2

client.query(`
  SELECT 
  politicians.name,
  COUNT (politician_id) as totalVote
  FROM politicians JOIN politician_voter 
  ON politician_id = politicians.id 
  WHERE politicians.name = 'Olympia Snowe'
  GROUP BY politicians.name
`,(err,data)=>{
    if(err)console.log(err)
    const Table = require('cli-table');
    const table = new Table();
    table.push(['Name','Total Vote'])
    for (let i = 0; i < data.rows.length; i++) {
      table.push([data.rows[i].name,data.rows[i].totalvote])
      
    }
    console.log(table.toString());
    // console.log(data.rows)
    // client.end()
})

//release 2 no 3

client.query(`
  SELECT 
  politicians.name,
  COUNT (politician_id) as totalVote
  FROM politicians JOIN politician_voter ON politicians.name LIKE 'Adam %' AND politicians.id=politician_id GROUP BY politicians.name
`,(err,data)=>{
    if(err)console.log(err)
    const Table = require('cli-table');
    const table = new Table();
    table.push(['Name','Total Vote'])
    for (let i = 0; i < data.rows.length; i++) {
      table.push([data.rows[i].name,data.rows[i].totalvote])
      
    }
    console.log(table.toString());
    // console.log(data.rows)
    // client.end()
})

//release 2 no 4

client.query(`
  SELECT 
  politicians.name,
  politicians.party,
  politicians.location,
  COUNT(*) totalVote
  FROM politician_voter JOIN politicians 
  ON politician_id=politicians.id 
  GROUP BY politicians.name,politicians.party,politicians.location
  ORDER BY totalVote DESC
  LIMIT 3
`,(err,data)=>{
    if(err)console.log(err)
    const Table = require('cli-table');
    const table = new Table();
    table.push(['Name','Party','Location','Total Vote'])
    for (let i = 0; i < data.rows.length; i++) {
      table.push([data.rows[i].name,data.rows[i].party,data.rows[i].location,data.rows[i].totalvote])
      
    }
    console.log(table.toString());
    // console.log(data.rows)
    // client.end()
})

//release 2 no 5

client.query(`
  SELECT 
  voters.first_name,
  voters.last_name,
  voters.gender,
  voters.age
  FROM politician_voter JOIN voters
  ON voter_id=voters.id
  WHERE politician_id=17
  GROUP BY voters.first_name,voters.last_name,voters.gender,voters.age
`,(err,data)=>{
    if(err)console.log(err)
    const Table = require('cli-table');
    const table = new Table();
    table.push(['First_name','Last_name','Gender','Age'])
    for (let i = 0; i < data.rows.length; i++) {
      table.push([data.rows[i].first_name,data.rows[i].last_name,data.rows[i].gender,data.rows[i].age])
      
    }
    console.log(table.toString());
    // console.log(data.rows)
    client.end()
})