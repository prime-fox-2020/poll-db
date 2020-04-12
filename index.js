let client = require("./connection");
client.connect();

client.query(`
  SELECT * FROM kandidat
  WHERE partai = 'R'
  AND grade_current > 9
  AND grade_current < 11
  `,(err, res) => {
    if(err) console.log(err);

    client.query(`
      SELECT COUNT (id_kandidat) AS totalVote, kandidat.nama
      FROM votes
      JOIN kandidat
      ON votes.id_kandidat = id_kandidat
      WHERE kandidat.nama = 'Olympia Snowe'
      AND id_kandidat = 17
      GROUP BY kandidat.nama;
      `,(err, res) => {
        if(err) console.log(err);

        client.query(`
          SELECT COUNT(DISTINCT id_kandidat) AS totalVote, kandidat.nama
          FROM votes
          JOIN kandidat
          ON votes.id_kandidat = id_kandidat
          WHERE kandidat.nama LIKE '%Adam%'
          GROUP BY kandidat.nama;
          `,(err, res) => {
            if(err) console.log(err);

            client.query(`
              SELECT  COUNT(*) AS totalVote, kandidat.nama, kandidat.partai, kandidat.lokasi
              FROM votes
              JOIN kandidat
              ON id_kandidat = votes.id_kandidat
              GROUP BY kandidat.nama, kandidat.partai, kandidat.lokasi
              ORDER BY COUNT(*) DESC
              LIMIT 3
              `,(err, res) => {
                if(err) console.log(err);

                client.query(`
                  SELECT nama_depan, nama_belakang, gender, age
                  FROM voters
                  JOIN votes ON voters.id = votes.id_voters
                  JOIN kandidat
                  ON votes.id_kandidat = kandidat.id
                  WHERE kandidat.nama = 'Olympia Snowe'
                  `,(err, res) => {
                    if(err) console.log(err);

          console.table(res.rows);
          client.end();
          })
        })
      })
    })
  })
