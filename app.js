const client = require('./connections.js')


// Release 2: It's Query Party!!

let queryChallenge_1 = `
SELECT name,party,grade_current 
FROM politicians
WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`

let queryChallenge_2 = `
SELECT COUNT(*) AS "totalVote", politicians.name
FROM politicians 
JOIN votes
ON politicians.id = votes.voters_id
WHERE politicians.name = 'Olympia Snowe'
GROUP BY politicians.name ` 

let queryChallenge_3 = ` 
SELECT politicians.name, COUNT(*) AS totalVote
FROM politicians 
JOIN votes
ON politicians.id = votes.voters_id
WHERE politicians.name LIKE '%Adam%'
GROUP BY politicians.name `

let queryChallenge_4 = `
SELECT COUNT(*) AS totalVote,politicians.name,politicians.party,politicians.location 
FROM politicians 
JOIN votes
ON politicians.id = votes.voters_id
GROUP BY politicians.name,politicians.party,politicians.location 
ORDER BY COUNT(*) DESC
LIMIT 3`

let queryChallenge_5 = `
SELECT voters.first_name, voters.last_name, voters.gender, voters.age
FROM voters
JOIN votes
ON voters.id = votes.politicians_id
JOIN politicians
ON politicians.id = votes.voters_id
WHERE politicians.name = 'Olympia Snowe'`

client.query(queryChallenge_1, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.table(res.rows);
        client.query(queryChallenge_2, (err, res) => {
            if (err) {
                console.log(err);
            } else {
                console.table(res.rows);
                client.query(queryChallenge_3, (err, res) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(res.rows);
                        client.query(queryChallenge_4, (err, res) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.table(res.rows);
                                client.query(queryChallenge_5, (err, res) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.table(res.rows);
                                        client.end()
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})

