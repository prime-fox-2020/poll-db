'use strict'

const { Client }  = require('pg');

const client = new Client({
  user: 'pipop',
  host: 'localhost',
  database: 'pollDB',
  password: 'qwerty1234',
  port: 5432,
})

client.connect();

client.query(`
  SELECT name, party, grade_current
  FROM politicians
  WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;
`, (err, res) => {
  if(err) throw(err);
  console.table(res.rows);
});

client.query(`
  SELECT COUNT(politicians.id) AS totalVote, politicians.name
  FROM votes JOIN politicians
  ON votes.politicianId = politicians.id
  WHERE politicians.name = 'Olympia Snowe'
  GROUP BY politicians.name;
`, (err, res) => {
  if(err) throw(err);
  console.table(res.rows);
});

client.query(`
  SELECT politicians.name, COUNT(politicians.id) AS totalVote
  FROM votes JOIN politicians
  ON votes.politicianId = politicians.id
  WHERE politicians.name LIKE 'Adam%'
  GROUP BY politicians.name;
`, (err, res) => {
  if(err) throw(err);
  console.table(res.rows);
});

client.query(`
  SELECT COUNT(politicians.id) AS totalVote, politicians.name, politicians.party, politicians.location
  FROM votes JOIN politicians
  ON votes.politicianId = politicians.id
  GROUP BY politicians.name, politicians.party, politicians.location
  ORDER BY COUNT(politicians.id) DESC
  LIMIT 3;
`, (err, res) => {
  if(err) throw(err);
  console.table(res.rows);
});

client.query(`
  SELECT DISTINCT voters.first_name, voters.last_name, voters.gender, voters.age 
  FROM voters, votes, politicians
  WHERE
  voters.id = votes.voterId
  AND
  politicians.id = votes.politicianId
  AND 
  politicians.name = 'Olympia Snowe';
`, (err, res) => {
  if(err) throw(err);
  console.table(res.rows);
  client.end();
});