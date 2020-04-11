const fs = require("fs")
const politicians = fs.readFileSync("./politicians.csv", "utf8").split("\r\n")
const votes = fs.readFileSync("./votes.csv", "utf8").split("\r\n")
const voters = fs.readFileSync("./voters.csv", "utf8").split("\r\n")
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'template',
    password: '12345678',
    port: 5432,
})

client.connect()

client.query(`
    SELECT pejabat.name,pejabat.party,pejabat.location,pejabat.grade_current FROM pejabat 
    WHERE party = 'R' AND grade_current BETWEEN 9 AND 11;
`, (err, res) => {
    if (err) console.log(err)

    console.table(res.rows)
})

client.query(`SELECT COUNT(voters_id) AS totalVote, pejabat.name 
                FROM votes 
                JOIN pejabat 
                ON votes.pejabat_id = pejabat.id 
                WHERE pejabat.name = 'Olympia Snowe'
                GROUP BY pejabat.name;
`, (err, res) => {
    if (err) console.log(err)

    console.table(res.rows)
})

client.query(`SELECT pejabat.name, COUNT(voters_id) AS totalVote 
                FROM votes 
                JOIN pejabat 
                ON votes.pejabat_id = pejabat.id 
                WHERE pejabat.name LIKE '%Adam%'
                GROUP BY pejabat.name;
`, (err, res) => {
    if (err) console.log(err)

    console.table(res.rows)
})

client.query(`SELECT COUNT(*) AS totalVote, pejabat.name,pejabat.party,pejabat.location 
                FROM votes
                JOIN pejabat
                ON pejabat.id = votes.pejabat_id
                GROUP BY pejabat.name,pejabat.party,pejabat.location
                ORDER BY COUNT(*) DESC
                LIMIT 3
`, (err, res) => {
    if (err) console.log(err)

    console.table(res.rows)
})

client.query(`SELECT first_name,last_name,gender,age 
                FROM voters
                WHERE voters.id IN (SELECT votes.voters_id 
                FROM votes
                JOIN pejabat 
                ON votes.pejabat_id = pejabat.id 
                WHERE pejabat.name = 'Olympia Snowe'
                GROUP BY votes.voters_id,pejabat.name);
`, (err, res) => {
    if (err) console.log(err)

    console.table(res.rows)
    client.end()
})