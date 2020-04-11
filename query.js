const {Client} = require('pg')

const client = new Client({
  user: `postgres`,
  host: `localhost`,
  database: `postgres`,
  password: `12345`,
  port : 5432,
})


client.connect()
// RELEASE 2 QUERY PERTAMA
client.query(`
SELECT DISTINCT politician.name,politician.party,politician.location,politician.grade_current
FROM politician
WHERE party = 'R'
AND grade_current BETWEEN 9 AND 11
ORDER BY grade_current ASC`, (err, res) =>{
  if (err) console.log(err);
  console.table(res.rows);
  // client.end()
})

//RELEASE 2 QUERY KEDUA
client.query(`
  SELECT COUNT(voters_id) AS total_vote, politician.name
  FROM votes JOIN politician
  ON votes.pejabat_id = politician.id
  WHERE politician.name = 'Olympia Snowe'
  GROUP BY politician.name
  `, (err, res) =>{
    if (err) console.log(err);
    console.table(res.rows);
    // client.end()
  })

//RELEASE 2 QUERY KETIGA 
  client.query(`
    SELECT politician.name, COUNT(voters_id) AS total_vote
    FROM votes JOIN politician
    ON votes.pejabat_id = politician.id
    WHERE politician.name LIKE 'Adam%'
    GROUP BY politician.name
    ORDER BY politician.name
    `, (err, res) =>{
      if (err) console.log(err);
      console.table(res.rows);
      // client.end()
    })

  
//RELEASE 2 QUERY KEEMPAT
  client.query(`
    SELECT COUNT(voters_id) AS total_vote, politician.name, politician.party, politician.location
    FROM votes JOIN politician
    ON votes.pejabat_id = politician.id
    GROUP BY politician.name, politician.party, politician.location
    ORDER BY COUNT (*) DESC
    LIMIT 3
    `, (err,res)=>{
    if (err) console.log(err)
    console.table(res.rows);
    // client.end()
  })

//RELEASE 2 QUERY KELIMA
  client.query(`
    SELECT first_name, last_name, gender, age
    FROM voters
    WHERE voters.id IN
    (SELECT votes.voters_id
      FROM votes JOIN politician
      ON votes.pejabat_id = politician.id
      WHERE politician.name = 'Olympia Snowe'
      ORDER BY voters.first_name ASC)
      `, (err,res) =>{
        if(err) console.log(err)
        console.table(res.rows);
        client.end()
      })