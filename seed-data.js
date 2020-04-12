// const client = require('./setup.js')

let fs = require('fs')
const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'password123',
    port: 5432,
})

// ===============
//   RELEASE 1
// ===============

//INSERT DATA S TO TABLE

let politiciansData = fs.readFileSync('./politicians.csv', 'utf8').toString().split('\n')
let votersData = fs.readFileSync('./voters.csv', 'utf8').toString().split('\n')
let votesData = fs.readFileSync('./votes.csv', 'utf8').toString().split('\n')
function seedData() {
    
    let newPoliticiansData = []
    let newVotersData = []
    let newVotesData = []
    
    for (let i = 1; i < politiciansData.length; i++) {
        let temp = politiciansData[i].split(',')
        newPoliticiansData.push(temp)
    }

    for (let i = 1; i < votersData.length; i++) {
        let temp = votersData[i].split(',')
        newVotersData.push(temp)
    }

    for (let i = 1; i < votesData.length; i++) {
        let temp = votesData[i].split(',')
        newVotesData.push(temp)

    }
   
    client.connect() // ===========================================================

    for (let i = 0; i < newPoliticiansData.length; i++) {
        client.query(`
            INSERT INTO politicians (name, party, location, grade_current) VALUES('${newPoliticiansData[i][0]}', '${newPoliticiansData[i][1]}', '${newPoliticiansData[i][2]}', '${newPoliticiansData[i][3]}')
        `, (err,res) => {
            if(err) console.log('err ---> ', err)
    
            console.log(res)
            // client.end()
        })
    }
    
    for (let i = 0; i < newVotersData.length; i++) {
        client.query(`
            INSERT INTO voters (first_name, last_name, gender, age) VALUES('${newVotersData[i][0]}', '${newVotersData[i][1]}', '${newVotersData[i][2]}', '${newVotersData[i][3]}')
        `, (err,res) => {
            if(err) console.log(err)
    
            console.log(res)
            // client.end()
        })
    }
   
    for (let i = 0; i < newVotesData.length; i++) {
        // console.log(newVotesData[i][0], newVotesData[i][1])
        client.query(`
            INSERT INTO votes (voter_id, politician_id) VALUES('${newVotesData[i][0]}', '${newVotesData[i][1]}')
        `, (err,res) => {
            if(err) console.log(err)
    
            console.log(res)
            // client.end()
        })
    }
    
}
// seedData()


// ===============
//    EXPERIMENT
// ===============

function insertPoliticians(name, party, location, grade_current){
    client.connect()
    const input = `INSERT INTO politicians (name, party, location, grade_current) 
                   VALUES ('${name}', '${party}', '${location}', '${grade_current}')`
    client.query(input, (err, res)=>{
        if(err) console.log(err)

        console.table(res.rows)
        client.end()
    })
}
// insertPoliticians('Raka', 'X', 'JKT', '123.123123') //add a new politician

function updateVoters(id, first_name, last_name){
    client.connect()
    const input = `UPDATE voters SET first_name = '${first_name}', last_name = '${last_name}'
                   WHERE id = ${id}`
    client.query(input, (err, res)=>{
        if(err) console.log(err)

        console.table(res.rows)
        client.end()
    })
}
// updateVoters(8, 'Kebon', 'Condet') //update Bernice Sanford

function deleteVotes(id){
    client.connect()
    const input = `DELETE FROM votes WHERE id = ${id}`
    client.query(input, (err, res)=>{
        if(err) console.log(err)

        console.table(res.rows)
        client.end()
    })
}
// deleteVotes(2) //delete id 2 


// ===============
//    RELEASE 2
// ===============

function partyR (){
    client.connect()
    client.query(`
        SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND (grade_current BETWEEN 9 AND 11)
    `, (err, res) => {
        if (err) console.log(err)

        console.log(res.rows)
        console.table(res.rows)
    })

}
// partyR()

//2
function olympiaCount (){
    client.connect()
    client.query(`
        SELECT p.id, count(v.voter_id), p.name
        FROM politicians as p 
        INNER JOIN votes as v ON p.id = v.politician_id
        WHERE p.name = 'Olympia Snowe'
        GROUP BY p.id
     `, (err, res) => {
        if (err) console.log(err)

        console.log(res.rows)
        console.table(res.rows)
    })

}
// olympiaCount()

//3
function findAdam (){
    client.connect()
    client.query(`
        SELECT p.id, p.name, count(v.voter_id)
        FROM politicians as p 
        INNER JOIN votes as v on p.id = v.politician_id
        WHERE p.name like '%Adam%'
        GRPUP BY p.id
        `, (err, res) => {
        if (err) console.log(err)

        console.log(res.rows)
        console.table(res.rows)
    })

}
// findAdam()

//4
function topThree (){
    client.connect()
    client.query(`
        SELECT p.name, p.party, p.location, count(v.voter_id) as totalVote
        FROM politicians as p 
        INNER JOIN votes as v on p.id = v.politician_id
        GROUP BY p.id
        ORDER BY totalVote desc 
        LIMIT 3
        `, (err, res) => {
        if (err) console.log(err)

        console.log(res.rows)
        console.table(res.rows)
    })

}
// topThree()

//5
function voteOlympia (){
    client.connect()
    client.query(`
        SELECT vr.first_name, vr.last_name, vr.gender, vr.age
        FROM voters as vr
        INNER JOIN votes as vs on vr.id = vs.voter_id
        INNER JOIN politicians as p on p.id = vs.politician_id
        WHERE p.name = 'Olympia Snowe'
        GROUP BY vr.id
        `, (err, res) => {
        if (err) console.log(err)

        console.log(res.rows)
        console.table(res.rows)
    })

}
// voteOlympia()









