//your code here
//your code here

const client = require('./connection.js')

client.connect()

client.query(`
    CREATE TABLE candidate(
        id SERIAL PRIMARY KEY,
        name VARCHAR,
        party VARCHAR,
        location VARCHAR,
        grade_current DECIMAL

    )`, (err, res) => {
    if (err) console.log(err)

    client.query(
        `CREATE TABLE voters(
                id SERIAL PRIMARY KEY,
                first_name VARCHAR,
                last_name VARCHAR,
                gender VARCHAR,
                age INTEGER
            )`, (err, res) => {
        if (err) console.log(err)

        client.query(
            `CREATE TABLE votes(
                        id SERIAL PRIMARY KEY,
                        voters_id INTEGER,
                        candidate_id INTEGER
                    )`, (err, res) => {
            if (err) console.log(err)

            console.log(res)
            client.end()
        })
    })
})

// client.query(`
//     DROP TABLE candidate`
//     , (err, res) => {
//     if (err) console.log(err)

//     client.query(
//         `DROP TABLE voters`
//         , (err, res) => {
//         if (err) console.log(err)

//         client.query(
//             `DROP TABLE votes`
//             , (err, res) => {
//             if (err) console.log(err)

//             console.log(res)
//             client.end()
//         })
//     })
// })
