const client = require('./connection.js')

client.connect()

client.query(`
SELECT * 
FROM candidate
    WHERE party = 'R' 
    AND grade_current > 9
    AND grade_current < 11;`
    ,(err, res)=> {
    if (err) console.log(err)


    console.log(`--------- Party R ------------`)
    console.table(res.rows)
})

client.query(
    `SELECT COUNT (candidate_id) AS total_vote, candidate.name
     FROM votes
        JOIN candidate
            ON votes.candidate_id = candidate_id
            WHERE candidate.name = 'Olympia Snowe'
            AND candidate_id = 17 
        GROUP by candidate.name;`
    ,(err, res) => {
        if (err) console.log(err);

        console.log(`-------- total votes for Olympia Snowe ----------`)
        console.table(res.rows)
    })

client.query(`
    SELECT name, COUNT(votes.voters_id) AS total_vote
    FROM candidate
        JOIN votes
            ON votes.candidate_id = candidate.id
            WHERE candidate.name LIKE '%Adam%'
        GROUP BY name;`
        ,(err, res) => {
            if (err) console.log(err);

            console.log(`------- total votes for politician with name 'ADAM' --------`)
            console.table(res.rows)
        })

client.query(`
    SELECT COUNT(*) AS total_vote, candidate.name, candidate.party, candidate.location
    FROM votes
        JOIN candidate
            ON candidate.id = votes.candidate_id
        GROUP BY candidate.name,candidate.party,candidate.location
        ORDER BY COUNT(*) DESC
        LIMIT 3`
            ,(err, res) => {
                if (err) console.log(err);

                console.log(`---------- TOP 3 politician with most votes -----------`)
                console.table(res.rows)
            })

client.query(`
   SELECT first_name, last_name,gender,age
   FROM voters
        JOIN votes ON voters.id = votes.voters_id
        JOIN candidate 
            ON votes.candidate_id = candidate.id
            WHERE candidate.name = 'Olympia Snowe'`
                ,(err, res) => {
                    if (err) console.log(err);


                    console.log(`------------voters who choose Olympia Snowe ------------`)
                    console.table(res.rows);
                    client.end()

                })