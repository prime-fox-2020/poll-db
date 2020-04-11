//your code here
const { Client } = require('pg');

const client = new Client({
	user: 'airell',
	host: 'localhost',
	database: 'template',
	password: 'tauhidjannah',
	port: 5432
});
client.connect();

// VOTERS TABLE
client.query(`
	CREATE TABLE IF NOT EXISTS voters (
		id SERIAL PRIMARY KEY,
		firstname VARCHAR,
		lastname VARCHAR,
		gender VARCHAR,
		age INTEGER
	)`, (err,data)=>{
		if(err)console.log(err)
		console.log(data)
		
	})

	//POLITICIANS TABLE
	client.query(
		`CREATE TABLE IF NOT EXISTS politicians (
			id SERIAL PRIMARY KEY,
			name VARCHAR,
			party VARCHAR,
			location VARCHAR,
			grade_current REAL

		)`, (err,data)=>{
			if(err)console.log(err)
			console.log(data)
			
		}
	)

	//VOTES TABLE 
	client.query(
		`CREATE TABLE IF NOT EXISTS votes (
			id SERIAL PRIMARY KEY,
			voter_id INTEGER,
			politician_id INTEGER
		)`, (err,data)=>{
			if(err)console.log(err)
			console.log(data)
			client.end()
		}
	)


