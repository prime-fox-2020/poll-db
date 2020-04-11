const fs = require ('fs')
let client = require ('./connection')
client.connect()

client.query(`
    SELECT * FROM kandidat
        WHERE partai = 'R'
        AND grade_current > 9
        AND grade_current < 11`
    ,(err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            console.table(res.rows)
            // client.end()
        }
})

client.query(`
    SELECT COUNT(*)
        FROM votes
        WHERE id_kandidat = 17`
    ,(err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
            // client.end()
        }
})

client.query(`
    SELECT nama, COUNT(votes.id_voters) AS totalVotes 
    FROM kandidat JOIN votes ON votes.id_kandidat = kandidat.id
    WHERE nama LIKE 'Adam%'
    GROUP BY nama`, (err, res)=>{
      if(err)console.log(err)
      console.log(res.rows)
      console.log(`_____________`)
    //   client.end()
})

client.query(`
    SELECT COUNT(votes.id_voters) AS totalVotes, nama, partai, lokasi
    FROM kandidat JOIN votes ON votes.id_kandidat = kandidat.id
    GROUP BY nama, partai, lokasi
    ORDER BY 1 DESC
    LIMIT 3`,  (err,res)=>{
      if(err)console.log(err)
      console.log(res.rows)
      console.log(`_____________`)
    //   client.end()
})


client.query(`
    SELECT nama_depan, nama_belakang, gender, age FROM voters JOIN votes ON voters.id = votes.id_voters
    JOIN kandidat ON votes.id_kandidat = kandidat.id
    WHERE kandidat.nama = 'Olympia Snowe'`, (err,data)=>{
      if(err)console.log(err)
      console.table(data.rows)
      console.log(`_____________`)
      client.end()
})
