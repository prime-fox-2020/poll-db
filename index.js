let client = require('./connection')
client.connect()

// cari partai R yang grade_current nya 9 - 11
client.query(` 
    SELECT * FROM kandidat
    WHERE partai = 'R'
    AND grade_current < 11
    AND grade_current > 9
`,(err, res)=>{
    if(err) console.log(err)
    

    console.table(res.rows)
})

// client.query(` 
//     ALTER TABLE kandidat
//     ADD COLUMN total_votes INTEGER
// `,(err, res)=>{
//     if(err) console.log(err)
    

//     console.table(res)
// })

// tambahin total vote
// client.query(`
//     SELECT * FROM votes
// `, (err, res)=>{
//     if(err) console.log(err)

//     let data1 = res.rows
//     client.query(`
//         SELECT * FROM kandidat
//     `, (err, res)=>{
//         if(err) console.log(err)

//         let data2 = res.rows
//         for(let a = 0; a < data2.length; a++){
//             let count = 0
//             for(let b = 0; b < data1.length; b++){
//                 if(data2[a].id == data1[b].id_kandidat){
//                     count++
//                 }
//             }
//             client.query(`
//                 UPDATE kandidat
//                 SET total_votes = ${count}
//                 WHERE id = ${data2[a].id}
            
//             `, (err,res)=>{
//                 if(err) console.log(err)

//             })
//         }
//     })
// })

// cari total vote Olympia Snowe
client.query(`
    SELECT nama, total_votes FROM kandidat
    WHERE nama = 'Olympia Snowe'
`,(err, res)=>{
    if(err) console.log(err)
    
    console.table(res.rows)
})

client.query(`
    SELECT nama, total_votes FROM kandidat
    WHERE nama LIKE '%Adam%'
`,(err, res)=>{
    if(err) console.log(err)
    
    console.table(res.rows)
})

client.query(`
    SELECT * 
    FROM kandidat
`, (err,res)=>{
    if(err) console.log(err)

    res.rows.sort((a,b) => (a.total_votes < b.total_votes) ? 1 : ((b.total_votes < a.total_votes) ? -1 : 0));
    let temp = []
    for(let a = 0; a < 3; a++){
        temp.push(res.rows[a])
    }
    console.table(temp)
})

client.query(`
    SELECT id
    FROM kandidat
    WHERE nama = 'Olympia Snowe'
`,(err,res)=>{
    if(err) console.log(err)

    let data = res.rows[0].id
    client.query(`
        SELECT *
        FROM votes
        WHERE id_kandidat = ${data}
    `,(err,res)=>{
        if(err) console.log(err)

        let data2 = res.rows
        let temp2 = []
        for(let a = 0; a < data2.length; a++){
            let simsalabim = `SELECT * FROM voters WHERE id = ${data2[a].id_voters}`
            client.query(simsalabim, (err,res)=>{
                if(err) console.log(err)
    
                temp2.push(res.rows[0])
                if(a === data2.length -1){
                    console.table(temp2)
                    client.end()
                }
            })
        }
    })
    
})