const fs = require('fs')
const client = require('./connection')


const dataPoliticians = fs.readFileSync('./data/politicians.csv', 'utf8').split('\n')
//console.log(dataPoliticians)
const tampungPoliticians = []
for(let i=0; i<dataPoliticians.length; i++) {
    tampungPoliticians.push(dataPoliticians[i].split(','))
}
//console.log(tampungPoliticians)

for(let j=0; j<tampungPoliticians.length; j++){
    let queryPoliticians = `INSERT INTO politicians(name, partai, location, grade_current)
                            VALUES ($1, $2, $3, $4)`
    
    client.query(queryPoliticians, tampungPoliticians[j], (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.log(tampungPoliticians[j])
        }
    })
}

const dataVoters = fs.readFileSync('./data/voters.csv', 'utf8').split('\n')
//console.log(dataVoters)
const tampungVoters = []
for(let i=0; i<dataVoters.length; i++) {
    tampungVoters.push(dataVoters[i].split(','))
}
//console.log(tampungVoters)

for(let j=0; j<tampungVoters.length; j++) {
    const dataVoters = `INSERT INTO voters(first_name, last_name, gender, age)
                        VALUES ($1, $2, $3, $4)`

    client.query(dataVoters, tampungVoters[j], (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.log(tampungVoters[j])
        }
    })                
}

const dataVotes = fs.readFileSync('./data/votes.csv', 'utf8').split('\n')
//console.log(dataVotes)
const tampungVotes = []
for(let i=0; i<dataVotes.length; i++) {
    tampungVotes.push(dataVotes[i].split(','))
}
//console.log(tampungVotes)

for(let j=0; j<tampungVotes.length; j++) {
    const queryVotes = `INSERT INTO votes(id_voters, id_politicians) VALUES ($1, $2)`

    client.query(queryVotes, tampungVotes[j], (err, data) => {
        if(err) {
            console.log(err)
        } else {
            console.log(tampungVotes[j])
        }
    })
}