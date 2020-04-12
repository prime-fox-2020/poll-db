const client = require('./connection')

client.connect()

client.query(`SELECT votes.id, politicians.name FROM votes INNER JOIN politicians ON politicians.ID=votes.politicianID WHERE politicians.name='Olympia Snowe' GROUP BY votes.id, politicians.name`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res.rowCount)
    }
    client.end()
})