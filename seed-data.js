const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'xxxaber321',
    port: 5432,
})
client.connect()

let politician = fs.readFileSync('./politicians.csv', 'utf8').split('\n').slice(1);
let result1 = [];

for (let a = 0; a < politician.length - 1; a++) {
    result1.push(politician[a].slice(0, politician[a].length - 1).split(","));
}

let query1 = `INSERT INTO politicians (nama, partai, location, grade_current) VALUES `;
for (let a = 0; a < result1.length; a++) {
    query1 += `('${result1[a][0]}', '${result1[a][1]}', '${result1[a][2]}', ${result1[a][3]})${a < result1.length -1 ? ',' : ''}`
  }
client.query(query1, (err, data) => {
    console.log(err, data)
})


let voter = fs.readFileSync('./voters.csv', 'utf8').split('\n').slice(1);
let result2 = [];

for (let a = 0; a < voter.length - 1; a++) {
    result2.push(voter[a].split(","));
}

let query2 = `INSERT INTO voters (first_name, last_name, gender, age) VALUES `
for (let a = 0; a < result2.length; a++) {
    query2 += `('${result2[a][0]}', '${result2[a][1]}', '${result2[a][2]}', ${result2[a][3]})${a < result2.length -1 ? ',' : ''}`
  }

client.query(query2, (err, data) => {
    console.log(err, data)
})


let votes = fs.readFileSync('./votes.csv', 'utf8').split('\n').slice(1);
let result3 = [];

for (let a = 0; a < votes.length - 1; a++) {
    result3.push(votes[a].split(","));
}

let query3 = `INSERT INTO votes (voter_id, politician_id) VALUES `
for (let a = 0; a < result3.length; a++) {
    query3 += `(${result3[a][0]}, ${result3[a][1]})${a < result3.length -1 ? ',' : ''}`
  }

client.query(query3, (err, data) => {
    console.log(err, data)
    client.end()
})



