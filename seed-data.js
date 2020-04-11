const fs = require('fs')
const client = require('./connection')

class Seeding {
    static seedPoll(){
        let politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
        const tampungPoll = []
        for (let i = 0; i < politicians.length; i++) {
            tampungPoll.push(politicians[i].split(','))
        }

        for (let i = 0; i < tampungPoll.length; i++) {
            let queryPoll = `INSERT INTO politicians(name, party, location, grade_current)
                             VALUES ($1, $2, $3, $4)`

            client.query(queryPoll, tampungPoll[i], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(tampungPoll[i]);
                }
            })
        }
    }

    static seedVoters(){
        let voters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
        const tampungVoters = []
        for (let i = 0; i < voters.length; i++) {
            tampungVoters.push(voters[i].split(','))
        }

        for (let i = 0; i < tampungVoters.length; i++) {
            let queryVoters = `INSERT INTO voters(first_name, last_name, gender, age)
                               VALUES ($1, $2, $3, $4)`
            
            client.query(queryVoters, tampungVoters[i], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(tampungVoters[i]);
                }
            })
        }
    }

    static seedVotes(){
        let votes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
        const tampungVotes = []
        for (let i = 0; i < votes.length; i++) {
            tampungVotes.push(votes[i].split(','))
        }

        for (let i = 0; i < tampungVotes.length; i++) {
            let queryVotes = `INSERT INTO votes(voter_id, politician_id)
                              VALUES ($1, $2)`
            
            client.query(queryVotes, tampungVotes[i], (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(tampungVotes[i]);
                }
            })
        }

    }
}

Seeding.seedPoll()
Seeding.seedVoters()
Seeding.seedVotes()