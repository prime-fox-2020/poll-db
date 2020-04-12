const{Client} = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432
});
const fs = require('fs');

const data = [fs.readFileSync('./politicians.csv', 'utf8').split('\n'), fs.readFileSync('./voters.csv', 'utf8').split('\n'),
fs.readFileSync('./votes.csv', 'utf8').split('\n')];
let politicians = `INSERT INTO politicians (name, party, location, grade_current) VALUES `;
let voters = `INSERT INTO voters (first_name, last_name, gender, age) VALUES `;
let votes = `INSERT INTO votes (voter_id, politician_id) VALUES `;

for (let i in data) {
    for (let j = 1; j < data[i].length; j++) {
        const row = data[i][j].split(',');
        if (i == '0') {
            politicians += `('${row[0]}', '${row[1]}', '${row[2]}', ${+row[3]})${j < data[i].length - 1 ? ',': ''}`;
        }
        else if (i == '1') {
            voters += `('${row[0]}', '${row[1]}', '${row[2]}', ${+row[3]})${j < data[i].length - 1 ? ',': ''}`;
        }
        else {
            votes += `(${+row[0]}, ${+row[1]}) ${j < data[i].length - 1 ? ',': ''}`;
        }
    }
}

client.connect();

// client.query(politicians, (err, res)=>{
//     if (err) console.log(err);
// })

// client.query(voters, (err, res)=>{
//     if (err) console.log(err);
// });

// client.query(votes, (err, res)=>{
//     if (err) console.log(err);
//     console.log('success');
//     client.end();
// });

client.query(`
    SELECT name, party, grade_current FROM politicians
    WHERE party = 'R' AND grade_current > 9 AND grade_current < 11;
`, (err, res)=>{
    if (err) console.log(err);
    console.table(res.rows);
});

client.query(`
    SELECT COUNT(v.id) total_vote, p.name
    FROM politicians p JOIN votes v ON v.politician_id = p.id 
    WHERE p.name = 'Olympia Snowe'
    GROUP BY p.name;
`, (err, res)=>{
    if (err) console.log(err);
    console.table(res.rows);
});

client.query(`
    SELECT p.name, COUNT(v.id) total_vote
    FROM politicians p JOIN votes v ON v.politician_id = p.id 
    WHERE p.name LIKE '%Adam%'
    GROUP BY p.name;
`, (err, res)=>{
    if (err) console.log(err);
    console.table(res.rows);
});

client.query(`
    SELECT COUNT(v.id) total_vote, p.name, p.party, p.location
    FROM politicians p JOIN votes v ON v.politician_id = p.id 
    GROUP BY p.name, p.party, p.location
    ORDER BY COUNT(v.id) DESC
    LIMIT 3;
`, (err, res)=>{
    if (err) console.log(err);
    console.table(res.rows);
});

client.query(`
  SELECT DISTINCT vr.first_name, vr.last_name, vr.gender, vr.age 
  FROM voters vr, votes v, politicians p
  WHERE vr.id = v.voter_id AND p.id = v.politician_id AND p.name = 'Olympia Snowe';
`, (err, res)=>{
  if(err) console.log(err);
  console.table(res.rows);
  client.end();
});