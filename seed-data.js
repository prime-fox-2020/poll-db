const { Client } = require('pg')
const fs = require('fs');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'pass',
  port: 5432,
})

client.connect();

let politicians = fs.readFileSync('./politicians.csv', 'utf8').split('\n');
let pol = [];
politicians.forEach(p => pol.push(p.split(',')))

let polQuery = '';
for (let i = 1; i < pol.length; i++) {
  polQuery += `('${pol[i][0]}','${pol[i][1]}','${pol[i][2]}',${pol[i][3]})${i < pol.length-1 ? ',':''}`
}

client.query(`
  INSERT INTO politicians (name, party, location, grade_current)
  VALUES ${polQuery};
`, (err, res) => {
  if (err) console.log(err);

  console.log(res);
})

let voters = fs.readFileSync('./voters.csv', 'utf8').split('\n');
let vot = [];
voters.forEach(p => vot.push(p.split(',')))

let votersQuery = '';
for (let i = 1; i < vot.length; i++) {
  votersQuery += `('${vot[i][0]}','${vot[i][1]}','${vot[i][2]}',${vot[i][3]})${i < vot.length-1 ? ',':''}`
}

client.query(`
  INSERT INTO voters (first_name, last_name, gender, age)
  VALUES ${votersQuery};
`, (err, res) => {
  if (err) console.log(err);

  console.log(res);
})

let votes = fs.readFileSync('./votes.csv', 'utf8').split('\n');
let vots = [];
votes.forEach(p => vots.push(p.split(',')))

let votesQuery = '';
for (let i = 1; i < vots.length; i++) {
  votesQuery += `(${vots[i][0]},${vots[i][1]})${i < vots.length-1 ? ',':''}`
}

client.query(`
  INSERT INTO votes (voterId, politicianId)
  VALUES ${votesQuery};
`, (err, res) => {
  if (err) console.log(err);

  console.log(res);
  client.end();
})