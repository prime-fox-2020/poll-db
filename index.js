const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass',
  port: 5432,
})

client.connect()

client.query(`
  SELECT name, party, grade_current FROM politicians
  WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.rows)
  // client.end()
})

client.query(`
  SELECT
    COUNT(*) totalVote, p.name
  FROM
    politicians p INNER JOIN votes v ON v.politicianId = p.id AND p.id = 17
  GROUP BY
    p.name  
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.rows);
  // client.end();
})

client.query(`
  SELECT
    p.name, COUNT(*) totalVote
  FROM
    politicians p INNER JOIN votes v ON v.politicianId = p.id AND p.name = 'Adam Kinzinger'
  GROUP BY
    p.name  
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.rows);
  // client.end();
})

client.query(`
  SELECT
    COUNT(*) totalVote,
    p.name,
    p.party,
    p.location
  FROM
    politicians p INNER JOIN votes v ON v.politicianId = p.id
  GROUP BY
    p.name,
    p.party,
    p.location
`, (err, res) => {
  if (err) console.log(err);

  console.log(res.rows);
  // client.end();
})

client.query(`
  SELECT
    p.first_name,
    p.last_name,
    p.gender,
    p.age
  FROM
    voters p INNER JOIN votes v ON v.voterId = p.id AND v.politicianId = 17
`, (err, res) => {
  if (err) console.log(err);

  console.table(res.rows);
  client.end();
})