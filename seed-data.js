const fs = require('fs')
const client = require('./connection.js')

//process data = csv to array 

let candidate = fs.readFileSync('./politicians.csv','utf8')
let voters = fs.readFileSync('./voters.csv','utf8')
let votes = fs.readFileSync('./votes.csv','utf8')

candidate = candidate.split('\n')
voters = voters.split('\n')
votes = votes.split('\n')

candidate = candidate.slice(1)
voters = voters.slice(1)
votes = votes.slice(1)

tempCandidate = []
tempVoters = []
tempVotes = []

for (let i = 0; i < candidate.length; i++) {
    tempCandidate.push(candidate[i].split(','))
}

for (let j = 0; j < voters.length; j++) {
    tempVoters.push(voters[j].split(','))
}

for (let k = 0; k < votes.length; k++) {
    tempVotes.push(votes[k].split(','))
}

let insertToCandidate = `INSERT INTO candidate (name, party, location, grade_current) VALUES`

for (let h = 0; h < tempCandidate.length; h++) {
    insertToCandidate += `('${tempCandidate[h][0]}','${tempCandidate[h][1]}','${tempCandidate[h][2]}','${tempCandidate[h][3]}')${h < tempCandidate.length - 1 ? ',' : ''}`
}
// console.log(insertToCandidate)

let insertToVoters = `INSERT INTO voters (first_name, last_name, gender, age) VALUES`

for (let l = 0; l < tempVoters.length; l++) {
    insertToVoters += `('${tempVoters[l][0]}','${tempVoters[l][1]}','${tempVoters[l][2]}','${tempVoters[l][3]}')${l < tempVoters.length - 1 ? ',' : ''}`
}
// console.log(insertToVoters)

let insertToVotes = `INSERT INTO votes (voters_id, candidate_id) VALUES`
for (let m = 0; m < tempVotes.length; m++) {
    insertToVotes += `('${tempVotes[m][0]}','${tempVotes[m][1]}')${m < tempVotes.length - 1 ? ',' : ''}`
}
// console.log(insertToVotes)

client.connect()
client.query(insertToCandidate, (err, res) => {
    if (err) console.log(err)

    console.log(res)
    client.query(insertToVoters, (err, res) => {
        if (err) console.log(err)

        console.log(res)
        client.query(insertToVotes, (err, res) => {
            if (err) console.log(err)

            console.log(res)
            client.end()
          })
    })
})

