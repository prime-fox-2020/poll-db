//your code here
const{Client} = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "root",
    port: 5432
});

client.connect();

client.query(`
CREATE TABLE IF NOT EXISTS politicians (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30),
    party VARCHAR(10),
    location VARCHAR(10),
    grade_current FLOAT
);
`, (err,res)=> {
    if (err) console.log(err);
    // console.log(res);
});

client.query(`
CREATE TABLE IF NOT EXISTS voters (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    gender VARCHAR(10),
    age INTEGER
);
`, (err,res)=> {
    if (err) console.log(err);
    // console.log(res);
});

client.query(`
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    voter_id INTEGER,
    politician_id INTEGER
);
`, (err,res)=> {
    if (err) console.log(err);
    // console.log(res);
    client.end();
});