let client = require('./connection')
client.connect()

client.query(`
    CREATE TABLE kandidat (
        id SERIAL PRIMARY KEY,
        nama VARCHAR,
        partai VARCHAR,
        lokasi VARCHAR,
        grade_current DECIMAL
    )
`,(err)=>{
    if(err) console.log(err)

    client.query(`
        CREATE TABLE voters (
            id SERIAL PRIMARY KEY,
            nama_depan VARCHAR,
            nama_belakang VARCHAR,
            gender VARCHAR,
            age INTEGER
        )
        `,(err)=>{
            if(err) console.log(err)

        client.query(`
            CREATE TABLE votes (
                id SERIAL PRIMARY KEY,
                id_voters INTEGER,
                id_kandidat INTEGER
            )
        `,(err, res)=>{
            if(err) console.log(err)

            console.log(res)
            client.end()
        })
    })
})

// Reset the Table
// client.query(`
//     DROP TABLE kandidat
// `,(err, res)=>{
//     if(err) console.log(err)

//     client.query(`
//         DROP TABLE voters
//     `,(err, res)=>{
//         if(err) console.log(err)

//         client.query(`
//             DROP TABLE votes
//         `,(err, res)=>{
//             if(err) console.log(err)

//             console.log(res)
//             client.end()
//         })
//     })
// })
