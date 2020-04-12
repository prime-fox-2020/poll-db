const client = require('./connection')

client.connect()

client.query(`SELECT name, party, grade_current FROM politicians WHERE party='R' AND grade_current BETWEEN 9 AND 11`, (err, res) => {
    if (err) {
        console.log(err)
    } else {
        console.log(res.rows)
    }
    client.end()
})