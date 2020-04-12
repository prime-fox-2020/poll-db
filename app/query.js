const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db-poll',
    password: 'postgres',
    port: 5432,
})


client.connect()

client.query(`SELECT name, party, grade_current FROM politicians 
    WHERE party = 'R' AND grade_current BETWEEN 9 AND 11
    
    `, (err, res) => {
    if(err){
        console.log(err)
        client.end()
    }
    else console.table(res.rows)
})

client.query(`SELECT COUNT(*) as totalVotes, politicians.name 
    FROM politicians INNER JOIN votes ON politicians.id = votes.politicianid 
    WHERE politicians.name = 'Olympia Snowe' GROUP BY politicians.name

    `, (err, res) => {
    if(err){
        console.log(err)
        client.end()
    }
    else console.log(res.rows)
})

client.query(`SELECT politicians.name, COUNT(*) as totalVotes
    FROM politicians INNER JOIN votes ON politicians.id = votes.politicianid
    WHERE politicians.name LIKE '%Adam%' GROUP BY politicians.name

    `, (err, res) => {
    if(err){
        console.log(err)
        client.end()
    }
    else console.log(res.rows)
})

client.query(`SELECT COUNT(*) as totalVotes, politicians.name, politicians.party, politicians.location
    FROM politicians INNER JOIN votes ON politicians.id = votes.politicianid
    GROUP BY politicians.name, politicians.party, politicians.location ORDER BY COUNT(*) DESC LIMIT 3

    `, (err, res) => {
    if(err){
        console.log(err)
        client.end()
    }
    else console.log(res.rows)
})

client.query(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age 
    FROM voters INNER JOIN votes ON voters.id = votes.voterid 
    INNER JOIN politicians ON politicians.id = votes.politicianid WHERE politicians.name = 'Olympia Snowe'

    `, (err, res) => {
    if(err){
        console.log(err)
        client.end()
    }
    else{
        console.log(res.rows)
        client.end()
    }
})