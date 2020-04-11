const {Client} = require('pg')
const fs = require('fs')

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'admin',
  port: 5432,
})

client.connect()

/* RELEASE 1 */
let dataPoliticians = fs.readFileSync('./politicians.csv', 'utf8').split('\n')
let politicians = []

for (let i = 1; i < dataPoliticians.length-1; i++) {
  dataPoliticians[i] = dataPoliticians[i].split(',')
  politicians.push({
    name: dataPoliticians[i][0],
    party: dataPoliticians[i][1],
    location: dataPoliticians[i][2],
    grade_current: Number(dataPoliticians[i][3])
  })
}

let textPoliticians = `INSERT INTO politicians(name, party, location, grade_current) VALUES`
politicians.forEach((item, idx)=> {
  textPoliticians += `('${item.name}', '${item.party}', '${item.location}', '${item.grade_current}')${idx < politicians.length-1 ? ', ' : ''}`
})

client.query(textPoliticians, (err, res)=> {
  if(err) console.log(err)
  console.log(res)
  // client.end()
})



let dataVoters = fs.readFileSync('./voters.csv', 'utf8').split('\n')
let voters = []

for (let i = 1; i < dataVoters.length-1; i++) {
  dataVoters[i] = dataVoters[i].split(',')
  voters.push({
    first_name: dataVoters[i][0],
    last_name: dataVoters[i][1],
    gender: dataVoters[i][2],
    age: Number(dataVoters[i][3])
  })
}    

let textVoters = `INSERT INTO voters(first_name, last_name, gender, age) VALUES`
voters.forEach((item, idx)=> {
  textVoters += `('${item.first_name}', '${item.last_name}', '${item.gender}', '${item.age}')${idx < voters.length-1 ? ', ' : ''}`
})

client.query(textVoters, (err, res)=> {
  if(err) console.log(err)
  console.log(res)
  // client.end()
})



let dataVotes = fs.readFileSync('./votes.csv', 'utf8').split('\n')
let votes = []

for (let i = 1; i < dataVotes.length-1; i++) {
  dataVotes[i] = dataVotes[i].split(',')
  votes.push({
    voterId: dataVotes[i][0],
    politicianId: dataVotes[i][1]
  })
}

let textVotes = `INSERT INTO votes(voterId, politicianId) VALUES`
votes.forEach((item, idx)=> {
  textVotes += `('${item.voterId}', '${item.politicianId}')${idx < votes.length-1 ? ', ' : ''}`
})

client.query(textVotes, (err, res)=> {
  if(err) console.log(err)
  console.log(res)
  // client.end()
})

/* RELEASE 2 */
// NO.1
client.query(`
SELECT name,party,grade_current
FROM politicians
WHERE party = 'R' AND grade_current BETWEEN 9 AND 11
  `, (err, res) => {
    if(err) console.log(err)
    console.log(`\nPolitician dari partai 'R' yang memiliki grade_current range 9 s/d 11\n======================================================================\n`)
    console.table(res.rows)
})

// NO.2
client.query(`
    SELECT COUNT(*) AS "totalVote", politicians.name
    FROM politicians 
    JOIN votes
    ON politicians.id = votes.politicianId
    WHERE politicians.name = 'Olympia Snowe'
    GROUP BY politicians.name 
  `, (err, res) => {
      if(err) console.log(err)
      console.log(`\nJumlah vote untuk politician yang bernama 'Olymipia Snowe'\n==========================================================\n`);
      console.table(res.rows)
  })

  //  NO.3
client.query(`
SELECT politicians.name, COUNT(*) AS totalVote
FROM votes 
JOIN politicians
ON votes.politicianId = politicians.Id
WHERE politicians.name LIKE '%Adam %'
GROUP BY politicians.name 
`, (err, res) => {
  if(err) console.log(err)
  console.log(`\nJumlah vote untuk politician yang namanya mengandung kata 'Adam'\n================================================================\n`);
  
  console.table(res.rows)
})


//  NO.4
client.query(`
SELECT COUNT(*) AS totalVote,politicians.name,politicians.party,politicians.location 
FROM politicians 
JOIN votes
ON politicians.id = votes.politicianId
GROUP BY politicians.name,politicians.party,politicians.location 
ORDER BY COUNT(*) DESC
LIMIT 3
`, (err, res) => {
  if(err) console.log(err)
  console.log(`\n3 suara terbanyak politician beserta partai dan lokasi nya\n===========================================================\n`)

  console.table(res.rows)
})

// NO.5
client.query(`
SELECT voters.first_name, voters.last_name, voters.gender, voters.age
FROM voters
JOIN votes
ON voters.id = votes.voterId
JOIN politicians
ON politicians.id = votes.politicianId
WHERE politicians.name = 'Olympia Snowe'
`, (err, res) => {
  if(err) console.log(err)
  console.log(`\nSiapa saja yang melakukan voting ke politician bernama 'Olympia snowe'\n======================================================================\n`)
  console.table(res.rows)
  client.end()
})
