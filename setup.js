//your code here
const client = require('./connection')

client.connect()

const createPoliticiansTable = `
CREATE TABLE IF NOT EXISTS Politicians (
    ID SERIAL PRIMARY KEY,
    name VARCHAR(50),
    party VARCHAR(1),
    location VARCHAR(2),
    grade_current NUMERIC(10,8)
)
`;

const createVotersTable = `
CREATE TABLE IF NOT EXISTS Voters (
    ID SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    gender VARCHAR(50),
    age INTEGER
)
`;

const createVotesTable = `
CREATE TABLE IF NOT EXISTS Votes (
    ID SERIAL PRIMARY KEY,
    voterId INTEGER,
    politicianId INTEGER
)
`;

client.query(createPoliticiansTable, (err, res) => {
        if (err) {
            console.log(err)
            client.end()
        } else {
            console.log('politicians table has been created')
            client.query(createVotersTable, (err, res) => {
                if (err) {
                    console.log(err)
                    client.end()
                } else {
                    console.log('voters table has been created')
                    client.query(createVotesTable, (err, res) => {
                            if (err) {
                                console.log(err)
                            } else {
                                console.log('votes table has been created')
                            }
                            client.end()
                        }
                    )
                }
            }
            )
        }
    }
)