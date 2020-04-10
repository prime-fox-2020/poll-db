const {Client} = require('pg')
const fs = require('fs')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres123',
    port: 5432,
  })

  client.connect()

const voters = fs.readFileSync(`./voters.csv`,'utf8')

// Database Pemilih
votersSplit1 = voters.split(`\r\n`)

let votersArrObj=[]
for (let i = 1; i < votersSplit1.length; i++) {
    let temp = votersSplit1[i].split(',')
    votersArrObj.push({
        first_name : temp[0],
        last_name : temp[1],
        gender: temp[2],
        age: Number(temp[3])
    })
}

let text = `INSERT INTO pemilih (first_name, last_name, gender, age) VALUES `

for (let i = 0; i < votersArrObj.length-1; i++) {
    text += `('${votersArrObj[i].first_name}', '${votersArrObj[i].last_name}', '${votersArrObj[i].gender}', '${votersArrObj[i].age}')` 
    i<votersArrObj.length-2 ? text += ', ':''
}

client.query(text, (err, res) => {
    if(err) console.log(err)
    console.log(res)
          })



const politicians = fs.readFileSync(`./politicians.csv`,'utf8')

// Database Pejabat
politiciansSplit1 = politicians.split(`\r\n`)

let politiciansArrObj=[]
for (let i = 1; i < politiciansSplit1.length; i++) {
    let temp = politiciansSplit1[i].split(',')
    politiciansArrObj.push({
        name : temp[0],
        partai : temp[1],
        location: temp[2],
        grade_current: Number(temp[3])
    })
}

let text = `INSERT INTO pejabat (name, partai, location, grade_current) VALUES `

for (let i = 0; i < politiciansArrObj.length-1; i++) {
    text += `('${politiciansArrObj[i].name}', '${politiciansArrObj[i].partai}', '${politiciansArrObj[i].location}', '${politiciansArrObj[i].grade_current}')` 
    i<politiciansArrObj.length-2 ? text += ', ':''
}

client.query(text, (err, res) => {
    if(err) console.log(err)
    console.log(res)
          })


const votes = fs.readFileSync('./votes.csv','utf8')

//Database Votes
votesSplit1 = votes.split(`\r\n`)

let votesArrObj=[]
for (let i = 1; i < votesSplit1.length; i++) {
    let temp = votesSplit1[i].split(',')
    votesArrObj.push({
        pemilih_id : Number(temp[0]),
        pejabat_id : Number(temp[1])
    })
}

let text = `INSERT INTO vote (pemilih_id, pejabat_id) VALUES `

for (let i = 0; i < votesArrObj.length-1; i++) {
    text += `('${votesArrObj[i].pemilih_id}', '${votesArrObj[i].pejabat_id}')` 
    i<votesArrObj.length-2 ? text += ', ':''
}

client.query(text, (err, res) => {
    if(err) console.log(err)
    console.log(res)
    client.end()
          })


          

          
        