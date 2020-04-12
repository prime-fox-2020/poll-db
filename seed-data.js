const fs = require('fs');
const client = require('./conection');
console.clear();

class Seeding {

    static queryPoll() {
        let politicians = fs.readFileSync('./politicians.csv', 'utf-8').split('\r\n')
        let columnName = politicians[0]
        let valuesPol = ''
        politicians.slice(1).map(x => x.split(',')).map(x => valuesPol += `('${x[0]}','${x[1]}','${x[2]}', ${Number(x[3])}),\n`)
        let insertPoliticians = `INSERT INTO politicians (${columnName}) VALUES ${valuesPol.slice(0, -2)}`
        return insertPoliticians
    }

    static queryVoters() {
        let voters = fs.readFileSync('./voters.csv', 'utf-8').split('\r\n')
        let columnName = voters[0]
        let valuesPol = ''
        voters.slice(1).map(x => x.split(',')).map(x => valuesPol += `('${x[0]}','${x[1]}','${x[2]}', ${Number(x[3])}),\n`)
        let insertVoters = `INSERT INTO voters (${columnName}) VALUES ${valuesPol.slice(0, -2)}`
        return insertVoters
    }

    static queryVotes() {
        let votes = fs.readFileSync('./votes.csv', 'utf-8').split('\r\n')
        let columnName = votes[0]
        let valuesPol = ''
        votes.slice(1).map(x => x.split(',')).map(x => valuesPol += `(${Number(x[0])}, ${Number(x[1])}),\n`)
        let insertVotes = `INSERT INTO votes (${columnName}) VALUES ${valuesPol.slice(0, -2)}`
        return insertVotes
    }

    static seeding() {
        client.connect()
        client.query(this.queryPoll(), (err, res) => {
            if (err) {
                console.log(err)
                client.end()
            } else {
                // console.clear();
                console.log('Seeding Politicians');
                client.query(this.queryVoters(), (err, res) => {
                    if (err) {
                        console.log(err)
                        client.end()
                    } else {
                        console.log('Seeding voters');
                        client.query(this.queryVotes(), (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Seeding votes');
                                client.end()
                            }
                        })
                    }
                })
            }
        })
    }
}

Seeding.seeding()

module.exports = {
    Seeding
};
