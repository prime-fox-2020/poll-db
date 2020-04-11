const fs = require ('fs')
let client = require ('./connection')

let kandidat = fs.readFileSync('./politicians.csv', 'utf8')
kandidat = kandidat.split('\r\n')
kandidat = kandidat.slice(1)

let voters = fs.readFileSync('./voters.csv', 'utf8')
voters = voters.split('\r\n')
voters = voters.slice(1)

let votes = fs.readFileSync('./votes.csv', 'utf8')
votes = votes.split('\r\n')
votes = votes.slice(1)

arrKandidat = []
arrVoters = []
arrVotes = []

for (let i = 0; i < kandidat.length; i++) {
    arrKandidat.push(kandidat[i].split(','))
}
for (let i = 0; i < voters.length; i++) {
    arrVoters.push(voters[i].split(','))
}
for (let i = 0; i < votes.length; i++) {
    arrVotes.push(votes[i].split(','))
}

let insertKandidat = `INSERT INTO kandidat (nama, partai, lokasi, grade_current) VALUES`

for (let i = 0; i < arrKandidat.length; i++) {
    insertKandidat += `('${arrKandidat[i][0]}', '${arrKandidat[i][1]}', '${arrKandidat[i][2]}', '${arrKandidat[i][3]}')${i < arrKandidat.length - 1 ? ',' : ''}`
}
// console.log(insertKandidat)

let insertVoters = `INSERT INTO voters (nama_depan, nama_belakang, gender, age) VALUES`

for (let i = 0; i < arrVoters.length; i++) {
    insertVoters += `('${arrVoters[i][0]}', '${arrVoters[i][1]}', '${arrVoters[i][2]}', '${arrVoters[i][3]}')${i < arrVoters.length - 1 ? ',' : ''}`
}
// console.log(insertVoters)

let insertVotes = `INSERT INTO votes (id_voters, id_kandidat) VALUES`

for (let i = 0; i < arrVotes.length; i++) {
    insertVotes += `('${arrVotes[i][0]}', '${arrVotes[i][1]}')${i < arrVotes.length - 1 ? ',' : ''}`
}
// console.log(insertVotes)

client.connect()
client.query(insertKandidat, (err, res) => {
    if (err) {
        console.log(err)
    }
    else {
        console.log(res)
        client.query(insertVoters, (err, res) => {
            if (err) {
                console.log(err)
            }
            else {
                client.query(insertVotes, (err, res) => {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        console.log(res)
                        client.end()
                    }
                })
            }
        })
    }
})