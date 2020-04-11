const { Client } = require('pg')
const fs = require('fs')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'sonyma2903',
    port: 5432,
})

client.connect()


// Politicians.csv transfer
// let dataP = fs.readFileSync('./politicians.csv', 'utf8')
// dataP = dataP.split('\r\n')
// let dataPHeader = dataP[0].split(',')
// let dataPoliticians = []
// for (let i = 1; i < dataP.length; i++) {
//     let splitData = dataP[i].split(',')
//     let temp = {}
//     temp[dataPHeader[0]] = splitData[0]
//     temp[dataPHeader[1]] = splitData[1]
//     temp[dataPHeader[2]] = splitData[2]
//     temp[dataPHeader[3]] = splitData[3]
//     dataPoliticians.push(temp)
// }

// let query_text = 'INSERT INTO politicians (name, party, location, grade_current) VALUES'

// dataPoliticians.forEach((item, idx) =>{
//     query_text += `('${item.name}', '${item.party}', '${item.location}', '${item.grade_current}') ${idx < dataPoliticians.length-1 ? ', ' : ''}`
// })

// // console.log(query_text)
// client.query(query_text, (err,res) =>{
//     if(err) console.log(err)

//     console.log(res)
//     client.end()
// })
//Politicians transfer end

//voters transfer
// let dataP = fs.readFileSync('./voters.csv', 'utf8')
// dataP = dataP.split('\r\n')
// let dataPHeader = dataP[0].split(',')
// let dataVoters = []
// for (let i = 1; i < dataP.length; i++) {
//     let splitData = dataP[i].split(',')
//     let temp = {}
//     temp[dataPHeader[0]] = splitData[0]
//     temp[dataPHeader[1]] = splitData[1]
//     temp[dataPHeader[2]] = splitData[2]
//     temp[dataPHeader[3]] = splitData[3]
//     dataVoters.push(temp)
// }

// let query_text = 'INSERT INTO voters (first_name, last_name, gender, age) VALUES'

// dataVoters.forEach((item, idx) =>{
//     query_text += `('${item.first_name}', '${item.last_name}', '${item.gender}', '${item.age}') ${idx < dataVoters.length-1 ? ', ' : ''}`
// })

// // console.log(dataVoters)
// client.query(query_text, (err,res) =>{
//     if(err) console.log(err)

//     console.log(res)
//     client.end()
// })
//voters end

//votes
// let dataP = fs.readFileSync('./votes.csv', 'utf8')
// dataP = dataP.split('\r\n')
// let dataPHeader = dataP[0].split(',')
// let dataVotes = []
// for (let i = 1; i < dataP.length; i++) {
//     let splitData = dataP[i].split(',')
//     let temp = {}
//     temp[dataPHeader[0]] = splitData[0]
//     temp[dataPHeader[1]] = splitData[1]
//     dataVotes.push(temp)
// }

// let query_text = 'INSERT INTO votes (voterid, politicianid) VALUES'

// dataVotes.forEach((item, idx) =>{
//     query_text += `('${item.voterId}', '${item.politicianId}') ${idx < dataVotes.length-1 ? ', ' : ''}`
// })

// // console.log(dataVotes)
// client.query(query_text, (err,res) =>{
//     if(err) console.log(err)

//     console.log(res)
//     client.end()
// })
//votes end

//------------------party = 'R' AND grade_current >= 9
// client.query(`
//     SELECT * FROM politicians WHERE party = 'R' AND grade_current >= 9
// `, (err,res) =>{
//     if(err) console.log(err)

//     console.table(res.rows)
//     client.end()
// })
//------------------party = 'R' AND grade_current >= 9 end

//------------------ vote untuk 'Olympia  Snowe'
// client.query(`
//     SELECT 
//         politicians.name, COUNT(votes.voterid) AS totalVote
//     FROM
//         votes JOIN politicians ON votes.politicianid = politicians.id_politicians
//     WHERE
//         politicians.name = 'Olympia Snowe'
//     GROUP BY
//         politicians.name
// `, (err, res) =>{
//     if(err) console.log(err)

//     console.table(res.rows)
//     client.end()
// })
//------------------ vote untuk 'Olympia Snowe' end

//------------------ vote untuk terdapat kata 'Adam'
// client.query(`
//     SELECT 
//         politicians.name, COUNT(votes.voterid) AS totalVote
//     FROM
//         votes JOIN politicians ON votes.politicianid = politicians.id_politicians
//     WHERE
//         politicians.name LIKE 'Adam%'
//     GROUP BY
//         politicians.name
// `, (err, res) =>{
//     if(err) console.log(err)

//     console.table(res.rows)
//     client.end()
// })
//------------------ vote untuk terdapat kata 'Adam' end

//------------------ vote untuk 3 politican terbanyak
// client.query(`
//     SELECT 
//         politicians.name, politicians.party, politicians.location, MAX(votes.voterid) AS totalVote
//     FROM
//         votes JOIN politicians ON votes.politicianid = politicians.id_politicians

//     GROUP BY
//         politicians.name, politicians.party, politicians.location
//     ORDER BY 
//         totalVote DESC
//     LIMIT 
//         3
// `, (err, res) =>{
//     if(err) console.log(err)

//     console.table(res.rows)
//     client.end()
// })
//------------------ vote untuk 3 politican terbanyak end

//------------------ temukan voter 'Olympia Snowe'
// client.query(`
//     SELECT 
//         voters.first_name, voters.last_name, voters.gender, age
//     FROM
//         voters JOIN votes ON voters.id_voters = votes.voterid JOIN politicians ON votes.politicianid = politicians.id_politicians 
//     WHERE
//         politicians.name = 'Olympia Snowe'
// `, (err,res) =>{
//     if(err) console.log(err);

//     console.table(res.rows);
//     client.end()    
// })
//------------------ temukan voter 'Olympia Snowe' end









