// //your code here
const client = require('./connection')
client.connect()

client.query(`
    CREATE TABLE kandidat (
        id SERIAL PRIMARY KEY,
        nama VARCHAR,
        partai VARCHAR,
        lokasi VARCHAR,
        grade_current DECIMAL
    )
`, (err, res) => {
    if (err) {
        console.log(err);
    }
    else {
        client.query (`
            CREATE TABLE voters (
                id SERIAL PRIMARY KEY,
                nama_depan VARCHAR,
                nama_belakang VARCHAR,
                gender VARCHAR,
                age INTEGER
            )        
            `,(err, res) =>{
                if (err) {
                    console.log(err);
                }
                else {
                    client.query(`
                        CREATE TABLE votes (
                            id SERIAL PRIMARY KEY,
                            id_voters INTEGER,
                            id_kandidat INTEGER
                        )
                    `,(err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(res);
                            client.end()
                        }
                    })
                }
            })
    }
})


// reset table
// client.query(`
//     DROP TABLE kandidat
// `, (err, res) => {
//     if (err) {
//         console.log(err)
//     }
//     else {
//         client.query(`
//         DROP TABLE voters
//         `, (err, res) => {
//             if (err) {
//                 console.log(err)
//             }
//             else {
//                 client.query(`
//                 DROP TABLE votes
//                 `, (err, res) => {
//                     console.log(res)
//                     client.end()
//                 })
//             }
//         })
//     }
// })