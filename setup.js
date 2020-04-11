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
const queryVote = `CREATE TABLE vote(
    id serial PRIMARY KEY,
    politicians_id VARCHAR(50),
    voters_id VARCHAR(50)
)`

client.query(queryPoliticians, (err, data) =>{
    if(err){
        console.log(err)
    }else{
        client.query(queryVoters, (err, data)=>{
            if(err){
                console.log(err)                
            }else{
                client.query(queryVote, (err, data)=>{
                    if(err){
                        console.log(err)                
                    }else{
                        client.end(data)
                    }
                })
            }
        })
    }
})
