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

