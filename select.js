const client = require('./connection')

client.query(`
    SELECT name,party,grade_current 
        FROM politicians
        WHERE party = 'R' AND grade_current BETWEEN 9 AND 11
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})

client.query(`
    SELECT COUNT(*) as totalVotes, politicians.name
        FROM votes INNER JOIN politicians
        ON politicians.id = votes.politician_id WHERE name = 'Olympia Snowe'
        GROUP BY politicians.name
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})

client.query(`
    SELECT politicians.name, COUNT(politicians.name) as totalVotes
        FROM voters INNER JOIN votes ON voters.id = votes.voter_id
        INNER JOIN politicians ON votes.politician_id = politicians.id
        WHERE politicians.name LIKE 'Adam %'
        GROUP BY politicians.name
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})


client.query(`
    SELECT politicians.name, politicians.party, politicians.location, COUNT(politicians.name) as totalVotes 
        FROM voters INNER JOIN votes ON voters.id = votes.voter_id
        INNER JOIN politicians ON votes.politician_id = politicians.id
        GROUP BY politicians.name, politicians.party, politicians.location
        ORDER BY totalVotes desc
        LIMIT 3
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})

client.query(`
    SELECT voters.first_name, voters.last_name, voters.gender, voters.age
        FROM voters INNER JOIN votes ON voters.id = votes.voter_id
        INNER JOIN politicians ON votes.politician_id = politicians.id
        WHERE politicians.name = 'Olympia Snowe'
` , (err, res) => {
    if(err) {
        console.log(err)
    } else {
        console.table(res.rows)
    }
})


