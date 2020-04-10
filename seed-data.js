const fs = require('fs');
const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_poll',
    password: 'admin',
    port: 5432,
})
console.clear();

class Seeding {

    static seedPoll() {
        let politicians = fs.readFileSync('./data/politicians.csv', 'utf-8').split('\r\n')
        let columnName = politicians[0]
        let valuesPol = ''
        politicians.slice(1).map(x => x.split(',')).map(x => valuesPol += `('${x[0]}','${x[1]}','${x[2]}','${x[3]}'),\n`)
        let insertPoliticians = `INSERT INTO politicians (${columnName}) VALUES ${valuesPol.slice(0, -2)}`
        client.connect()
        client.query(insertPoliticians, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.clear();
                console.log('Seeding Politicians');
            }
            client.end()
        })
    }

    static seedVoters() {
        let voters = fs.readFileSync('./data/voters.csv', 'utf-8').split('\r\n')
        let columnName = voters[0]
        let valuesPol = ''
        voters.slice(1).map(x => x.split(',')).map(x => valuesPol += `('${x[0]}','${x[1]}','${x[2]}','${x[3]}'),\n`)
        let insertVoters = `INSERT INTO voters (${columnName}) VALUES ${valuesPol.slice(0, -2)}`
        client.connect()
        client.query(insertVoters, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.clear();
                console.log('Seeding voters');
            }
            client.end()
        })
    }

    static seedVotes() {
        let votes = fs.readFileSync('./data/votes.csv', 'utf-8').split('\r\n')
        let columnName = votes[0]
        let valuesPol = ''
        votes.slice(1).map(x => x.split(',')).map(x => valuesPol += `('${x[0]}','${x[1]}'),\n`)
        let insertVotes = `INSERT INTO votes (${columnName}) VALUES ${valuesPol.slice(0, -2)}`
        client.connect()
        client.query(insertVotes, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.clear();
                console.log('Seeding votes');
            }
            client.end()
        })
    }

    
}

Seeding.seedPoll()
Seeding.seedVoters()
Seeding.seedVotes()

module.exports = {
    Seeding
};
