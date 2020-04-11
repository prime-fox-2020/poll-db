const client = require('./config/conection');

let partyR = `SELECT * FROM politicians WHERE party = 'R' AND grade_current BETWEeN 9 AND 11;`
let countSnowe = `SELECT COUNT(*) as totalVotes, p.name
FROM votes as v INNER JOIN politicians as p
ON p.id = v.politicianid WHERE name = 'Olympia Snowe'
GROUP BY p.name`

let adamCount = `SELECT p.name, COUNT(p.name) as totalVotes 
FROM voters as v INNER JOIN votes ON v.id = votes.voterid
INNER JOIN politicians as p ON votes.politicianid = p.id
WHERE p.name LIKE 'Adam %'
GROUP BY p.name`

let votersCount = `SELECT p.name, p.party, p.location, COUNT(p.name) as totalVotes 
FROM voters as v INNER JOIN votes ON v.id = votes.voterid
INNER JOIN politicians as p ON votes.politicianid = p.id
GROUP BY p.name, p.party, p.location
ORDER BY totalVotes desc
FETCH FIRST 3 ROW ONLY`

let voterSnowe = `SELECT v.first_name, v.last_name, v.gender, v.age
FROM voters as v INNER JOIN votes ON v.id = votes.voterid
INNER JOIN politicians as p ON votes.politicianid = p.id
WHERE p.name = 'Olympia Snowe'`

client.connect()
console.clear();
client.query(partyR, (err, res) => {
    if (err) {
        console.log(err);
        client.end()
    } else {
        console.table(res.rows);
        client.query(countSnowe, (err, res) => {
            if (err) {
                console.log(err);
                client.end()
            } else {
                console.table(res.rows);
                client.query(adamCount, (err, res) => {
                    if (err) {
                        console.log(err);
                        client.end()
                    } else {
                        console.table(res.rows);
                        client.query(votersCount, (err, res) => {
                            if (err) {
                                console.log(err);
                                client.end()
                            } else {
                                console.table(res.rows);
                                client.query(voterSnowe, (err, res) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.table(res.rows);
                                    }
                                    client.end()
                                })
                            }
                        })
                    }
                })
            }
        })
    }
})