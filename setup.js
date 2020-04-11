const client = require('./connection')

const queryPolitician = `CREATE TABLE politician (
    id serial PRIMARY KEY,
    name VARCHAR(50), 
    party VARCHAR(1),
    location VARCHAR(2),
    grade_current FLOAT
);`

const queryVoters = `CREATE TABLE voters (
    id serial PRIMARY KEY,
    first_name VARCHAR(15),
    last_name VARCHAR(15),
    gender VARCHAR(10),
    age INTEGER
);`

const queryVotes = `CREATE TABLE votes (
    id serial PRIMARY KEY,
    vote_id INTEGER,
    politician_id INTEGER
);`

 

client.query(queryPolitician, (err, res) => {
    if(err) {
        console.log(err, '----------------');
    }
    else {
        console.log('POLITISI');
        client.query(queryVoters, (err, res) => {
            if(err) {
                console.log(err, '----------------');
            } 
            else {
                console.log('PEMILIH')
                client.query(queryVotes, (err, res) => {
                    if(err){
                        console.log(err, '----------------');
                    }else{
                        console.log('SUARA');
                        client.end();
                    }
                })
            }
        })
    }
});