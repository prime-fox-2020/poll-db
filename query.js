const { Client } = require('pg')
const client = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'template',
    password : 'postgres',
    port : 5432, 
})

client.connect()

// No.1 
let query1 = `
SELECT name, party, grade_current
FROM candidate
WHERE party = 'R'
    AND grade_current BETWEEN 9 AND 11;`

client.query(query1, (err, res) =>{
    if (err) console.log(err)

    console.log('1st Query')
    console.table(res.rows)
})

// No. 2
let query2 = `
SELECT COUNT(votes.id) as totalVote, candidate.name
FROM votes
JOIN candidate
ON votes.candidateid = candidate.id
WHERE candidate.name = 'Olympia Snowe'
GROUP BY candidate.name;` 

client.query(query2, (err,res)=>{
    if (err) console.log(err)

    console.log('2nd Query')
    console.table(res.rows)
})

// No. 3
let query3 = `
SELECT COUNT(votes.id) as totalVote, candidate.name
FROM votes
JOIN candidate
ON votes.candidateid = candidate.id
WHERE candidate.name LIKE 'Adam%'
GROUP BY candidate.name;` 

client.query(query3, (err,res)=>{
    if (err) console.log(err)

    console.log('3rd Query')
    console.table(res.rows)
})

// No.4
let query4 = `
SELECT COUNT(votes.id) as totalVote, candidate.name, candidate.party, candidate.location
FROM votes
JOIN candidate
ON votes.candidateid = candidate.id
GROUP BY candidate.name, candidate.party, candidate.location
ORDER BY totalVote DESC
LIMIT 3;` 

client.query(query4, (err,res)=>{
    if (err) console.log(err)

    console.log('4th Query')
    console.table(res.rows)
})

// No. 5
let query5 = `
SELECT voter.firstname, voter.lastname, voter.gender, voter.age
FROM voter
JOIN votes
ON voter.id = votes.voterid
JOIN candidate
ON votes.candidateid = candidate.id
WHERE candidate.name = 'Olympia Snowe';`

client.query(query5, (err,res)=>{
    if (err) console.log(err)

    console.log('5th Query')
    console.table(res.rows)
    client.end()
})