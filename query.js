const client = require('./connection')

function tampilkanR(){
    const queryR = `SELECT name, partai, grade_current FROM politicians
                    WHERE partai = 'R' AND grade_current BETWEEN 9 AND 11`
    
    client.query(queryR, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.table(data.rows)
        }
    })
}

tampilkanR()

function countVoteOlym() {
    const queryVote = `SELECT COUNT (n.id_politicians) As totalVote, i.name 
                       FROM votes As n INNER JOIN politicians AS i On n.id_politicians = i.id_politicians
                       WHERE i.name = 'Olympia Snowe' GROUP BY i.name`

    client.query(queryVote, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.table(data.rows)
        }
    })
}
countVoteOlym()

function countPoliticianAdam() {
    const queryVote = `SELECT i.name, COUNT(n.id_politicians) As totalVote FROM votes As n
                       INNER JOIN politicians As i ON n.id_politicians = i.id_politicians
                       WHERE i.name LIKE 'Adam%' GROUP BY i.name`

    client.query(queryVote, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.table(data.rows)
        }
    })
}
countPoliticianAdam()

function suaraTerbanyak(){
    const queryPoliticians = `SELECT COUNT (n.id_politicians) AS totalVote, i.name, i.partai, i.location FROM votes As n
                              INNER JOIN politicians As i ON n.id_politicians = i.id_politicians GROUP BY i.name, i.partai, 
                              i.location ORDER BY totalVote desc FETCH FIRST 3 ROW ONLY ` 

    client.query(queryPoliticians, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.table(data.rows)
        }
    })
}
suaraTerbanyak()

function votingOlym() {
    const queryOlym = `SELECT i.first_name, i.last_name, i.gender, i.age
                      FROM votes AS v INNER JOIN politicians as p ON v.id_politicians = p.id_politicians
                      INNER JOIN voters as i ON v.id_voters = i.id_voters WHERE p.name = 'Olympia Snowe'`

    client.query(queryOlym, (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.table(data.rows)
        }
    })
}
votingOlym()