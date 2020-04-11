const client = require('./connections.js')


let dataPoliticians = `SELECT * FROM politicians`
let entry = null
client.query(dataPoliticians, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        console.log(res.rows);
    }
    entry = res.rows
    client.end()
})

console.log(entry);
