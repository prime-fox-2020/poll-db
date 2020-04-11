const {Client} = require('pg')
const fs = require('fs')

const client = new Client({
  user: `postgres`,
  host: `localhost`,
  database: `postgres`,
  password: `12345`,
  port : 5432,
})




client.connect()

// SEED POLITICIAN CSV TO POLITICIAN DB IN POSTGRES
const politician = (fs.readFileSync('./politicians.csv', 'utf8').split('\n'))

let politicianArr = []  
for (let i = 1; i < politician.length; i++){
  let temp = politician[i].split(',')
  politicianArr.push({
    name : temp[0],
    party : temp[1],
    location : temp[2],
    grade_current : Number(temp[3])
  }) 
}

let politician_text = `INSERT INTO politician (name, party, location, grade_current) VALUES `
for (let i = 0; i<politicianArr.length-1; i++){
  politician_text += `('${politicianArr[i].name}', '${politicianArr[i].party}', '${politicianArr[i].location}', '${politicianArr[i].grade_current}')`
  i<politicianArr.length-2 ? politician_text += ', ':''
}
client.query(politician_text, (err, res) => {
  if (err) console.log(err);
  console.log(res);
})


// SEED VOTERS CSV TO VOTERS DB IN POSTGRES
const voters = (fs.readFileSync('./voters.csv', 'utf8').split('\n'))

let votersArr = []
for (let i = 1; i < voters.length; i++){
  let temp = voters[i].split(',')
  votersArr.push({
    first_name : temp[0],
    last_name : temp[1],
    gender : temp[2],
    age : Number(temp[3])
  }) 
}

let voters_text = `INSERT INTO voters (first_name, last_name, gender, age) VALUES `
for (let i = 0; i<votersArr.length-1; i++){
  voters_text += `('${votersArr[i].first_name}', '${votersArr[i].last_name}', '${votersArr[i].gender}', '${votersArr[i].age}')`
  i<votersArr.length-2 ? voters_text += ', ':''
}

client.query(voters_text, (err, res) => {
  if (err) console.log(err);
  console.log(res);
})



// SEED VOTES CSV TO VOTES DB IN POSTGRES
const votes = (fs.readFileSync('./votes.csv', 'utf8').split('\n'))

let votesArr = []
for (let i = 1; i < votes.length; i++){
  let temp = votes[i].split(',')
  votesArr.push({
    voters_id : temp[0],
    pejabat_id : temp[1]
  }) 
}

let votes_text = `INSERT INTO votes (voters_id, pejabat_id) VALUES `
for (let i = 0; i<votesArr.length-1; i++){
  votes_text += `('${votesArr[i].voters_id}', '${votesArr[i].pejabat_id}')`
  i<votesArr.length-2 ? votes_text += ', ':''
}

client.query(votes_text, (err, res) => {
  if (err) console.log(err);
  console.log(res);
  client.end()
})