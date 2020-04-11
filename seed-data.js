const fs = require('fs')
const client = require('./connections.js')

function readPoliticians() {
    let politiciansName = fs.readFileSync('./politicians.csv', 'utf8').split('\r\n')
    let politiciansData = []
    for (let i = 0; i < politiciansName.length; i++) {
        politiciansData.push(politiciansName[i].split(','))
    }
    return politiciansData
}

function convertDataPoliticians() {
    let dataPoliticians = readPoliticians()
    let tempString = ''
    for (let i = 1; i < dataPoliticians.length; i++) {
        let dataString = ''
        for (let j = 0; j < dataPoliticians[i].length; j++) {
            if (dataPoliticians[i][j] === dataPoliticians[i][dataPoliticians[i].length - 1]) {
                dataString += `${dataPoliticians[i][j]}`
            } else {
                dataString += `'${dataPoliticians[i][j]}', `
            }
        }
        if (dataPoliticians[i] === dataPoliticians[dataPoliticians.length - 1]) {
            tempString += `(${dataString})`
        } else {
            tempString += `(${dataString}), `
        }
    }
    
    return tempString
}


function readVoters() {
    let votersName = fs.readFileSync('./voters.csv', 'utf8').split('\r\n')
    let votersData = []
    for (let i = 0; i < votersName.length; i++) {
        votersData.push(votersName[i].split(','))
    }
    return votersData
}

function convertDataVoters() {
    let dataVoters = readVoters()
    let tempString = ''
    for (let i = 1; i < dataVoters.length; i++) {
        let dataString = ''
        for (let j = 0; j < dataVoters[i].length; j++) {
            if (dataVoters[i][j] === dataVoters[i][dataVoters[i].length - 1]) {
                dataString += `${(dataVoters[i][j]).replace("'", "''")}`
            } else {
                dataString += `'${(dataVoters[i][j]).replace("'", "''")}', `
            }
        }
        if (dataVoters[i] === dataVoters[dataVoters.length - 1]) {
            tempString += `(${dataString})`
        } else {
            tempString += `(${dataString}), `
        }
    }
    
    return tempString
}


function readVotes() {
    let votes = fs.readFileSync('./votes.csv', 'utf8').split('\r\n')
    let votesData = []
    for (let i = 0; i < votes.length; i++) {
        votesData.push(votes[i].split(','))
    }
    return votesData
}

function convertDataVotes() {
    let dataVotes = readVotes()
    let tempString = ''
    for (let i = 1; i < dataVotes.length; i++) {
        let dataString = ''
        for (let j = 0; j < dataVotes[i].length; j++) {
            if (dataVotes[i][j] === dataVotes[i][dataVotes[i].length - 1]) {
                dataString += `${(dataVotes[i][j]).replace("'", "''")}`
            } else {
                dataString += `'${(dataVotes[i][j]).replace("'", "''")}', `
            }
        }
        if (dataVotes[i] === dataVotes[dataVotes.length - 1]) {
            tempString += `(${dataString})`
        } else {
            tempString += `(${dataString}), `
        }
    }
    
    return tempString
}


let dataCompleteStringPoliticians = convertDataPoliticians()
const insertPoliticians = `
INSERT INTO politicians (name, party, location, grade_current)
VALUES ${dataCompleteStringPoliticians};`

let dataCompleteStringVoters = convertDataVoters()
const insertVoters = `
INSERT INTO voters (first_name, last_name, gender, age)
VALUES ${dataCompleteStringVoters};`

let dataCompleteStringVotes = convertDataVotes()
const insertVotes = `
INSERT INTO votes (politicians_id, voters_id)
VALUES ${dataCompleteStringVotes};`


function insertDataPoliticians(masukanData) {
    client.query(masukanData,(err, res)=>{
        if(err){
            console.log(err, 'error jancuk')
            client.end()
        } else {
            console.log(res, 'berhasil')
        }
    })
}

insertDataPoliticians(insertPoliticians)


function insertDataVoters(masukanData) {
    client.query(masukanData, (err, res)=>{
        if(err){
            console.log(err, 'error jancuk')
            client.end()
        } else {
            console.log(res, 'berhasil')
        }
    })
}

insertDataVoters(insertVoters)

function insertDataVotes(masukanData) {
    client.query(masukanData,(err, res)=>{
        if(err){
            console.log(err, 'error jancuk')
            client.end()
        } else {
            console.log(res, 'berhasil')
            client.end()
        }
    })
}

insertDataVotes(insertVotes)


module.exports = client