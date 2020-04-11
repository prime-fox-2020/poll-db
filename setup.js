//your code here
const client = require('./connections.js')

// Create 3 tables
const queryPoliticians = `CREATE TABLE politicians (
    id serial PRIMARY KEY,
    name VARCHAR(50),
    party VARCHAR(50),
    location TEXT,
    grade_current FLOAT
)`
const queryVoters =`CREATE TABLE voters(
    id serial PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(50),
    age INTEGER
)`
const queryVotes = `CREATE TABLE votes(
    id serial PRIMARY KEY,
    politicians_id INTEGER,
    voters_id INTEGER
)`

client.query(queryPoliticians, (err, data) =>{
    if(err){
        console.log(err)
    }else{
        client.query(queryVoters, (err, data) =>{
            if(err){
                console.log(err)                
            }else{
                client.query(queryVotes, (err, data) =>{
                    if(err){
                        console.log(err)                
                    }else{
                        client.end()
                    }
                })
            }
        })
    }
})
