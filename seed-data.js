const fs = require('fs')
const { Client } = require('pg')
const client = new Client({
    user : 'postgres',
    host : 'localhost',
    database : 'template',
    password : 'postgres',
    port : 5432, 
})

client.connect()

// Data Kandidat ke Database
function candidateData(){
    let candidateData = fs.readFileSync('./politicians.csv','utf-8')
    let candidateDataSplit = candidateData.split('\n')
    let candidateDataContainer = []
    for (let i = 1; i<candidateDataSplit.length-1; i++){
        candidateDataContainer.push(candidateDataSplit[i].split(','))
    }
    let candidateQuery = `INSERT INTO candidate (fullname, party, location, grade_current) VALUES `
    let candidateText = ''
    for (let j = 0; j<candidateDataContainer.length; j++){
        if (j < candidateDataContainer.length-1){
            candidateText += `('${candidateDataContainer[j][0]}', '${candidateDataContainer[j][1]}', '${candidateDataContainer[j][2]}', ${candidateDataContainer[j][3]}), `
        } else {
            candidateText += `('${candidateDataContainer[j][0]}', '${candidateDataContainer[j][1]}', '${candidateDataContainer[j][2]}', ${candidateDataContainer[j][3]})`
        }
    }
    candidateQuery += candidateText
    return candidateQuery
}
// console.log(candidateQuery)
// client.query(candidateData(), (err, res) =>{
//     if (err) console.log(err)
    
//     console.log(res)
// })

// Data Voters ke DB
function voterData(){
    let voterData = fs.readFileSync('./voters.csv','utf-8')
    let voterDataSplit = voterData.split('\n')
    let voterDataContainer = []
    for (let i = 1; i<voterDataSplit.length-1; i++){
        voterDataContainer.push(voterDataSplit[i].split(','))
    }
    let voterDataQuery = `INSERT INTO voter (firstname, lastname, gender, age) VALUES `
    let voterDataText = ''
    for (let j = 0; j<voterDataContainer.length; j++){
        if (j<voterDataContainer.length-1){
            voterDataText += `('${voterDataContainer[j][0]}', '${voterDataContainer[j][1]}', '${voterDataContainer[j][2]}', ${voterDataContainer[j][3]}),`
        } else {
            voterDataText += `('${voterDataContainer[j][0]}', '${voterDataContainer[j][1]}', '${voterDataContainer[j][2]}', ${voterDataContainer[j][3]})`        
        }
    }
    voterDataQuery += voterDataText
    return voterDataQuery
}
// console.log(voterDataQuery)
// client.query(voterData(), (err, res) =>{
//     if (err) console.log(err)

//     console.log(res)
// })

// Data Votes ke DB
function votesData(){
    let votesData = fs.readFileSync('./votes.csv','utf-8')
    let votesDataSplit = votesData.split('\n')
    let votesDataContainer = []
    for (let i = 1; i<votesDataSplit.length-1; i++){
        votesDataContainer.push(votesDataSplit[i].split(','))
    }
    let votesDataQuery = `INSERT INTO votes (voterID, candidateID) VALUES `
    let votesDataText = ''
    for (let j = 0; j<votesDataContainer.length; j++){
        if (j < votesDataContainer.length-1){
            votesDataText += `(${votesDataContainer[j][0]}, ${votesDataContainer[j][1]}),`
        } else {
            votesDataText += `(${votesDataContainer[j][0]}, ${votesDataContainer[j][1]})`
        }
    }
    votesDataQuery += votesDataText
    return votesDataQuery
}
// console.log(votesData())
client.query(votesData(), (err, res) => {
    if (err) console.log(err)

    console.log(res)
    client.end()
})
