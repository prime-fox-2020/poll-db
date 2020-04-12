const client = require('./connection')

client.connect()

client.query(`SELECT voters.first_name, voters.last_name, voters.gender, voters.age FROM voters INNER JOIN votes ON voters.ID=votes.voterID INNER JOIN politicians ON votes.politicianID=politicians.ID WHERE politicians.name='Olympia Snowe'`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res.rows)
    }
    client.end()
})