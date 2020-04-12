const client = require('./connection')

client.connect()

client.query(`SELECT COUNT(politicians.name) AS totalVotes, politicians.name, politicians.party, politicians.location FROM politicians INNER JOIN votes ON politicians.ID=votes.politicianID GROUP BY politicians.name, politicians.party, politicians.location ORDER BY totalVotes DESC LIMIT 3`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res.rows)
    }
    client.end()
})