const { Client } = require('pg');
const fs = require('fs');
const client = new Client({
	user: 'airell',
	host: 'localhost',
	database: 'template',
	password: 'tauhidjannah',
	port: 5432
});
client.connect();

class Politicians {
	static insertData() {
		let read = fs.readFileSync('politicians.csv', 'utf8').split('\n');
		for (var i = 1; i < read.length; i++) {
			read[i] = read[i].split(',');
		}
		let cetak = `INSERT INTO politicians (name, party, location, grade_current) VALUES`;
		for (var i = 1; i < read.length - 1; i++) {
			cetak += `('${read[i][0]}', '${read[i][1]}', '${read[i][2]}', '${read[i][3]}')${i < read.length - 2
				? ', '
				: ''}`;
		}

		// client.query(cetak, (err,data)=>{
		//   if(err)console.log(err)
		//   console.log(data)
		//   client.end();
    // })
 
    
  }
  static findingData(){
    // RELEASE 2 yang ke-1   
    client.query(`
      SELECT name, party, grade_current FROM politicians
      WHERE grade_current BETWEEN 9 AND 11
      AND party = 'R'`, (err,data)=>{
        if(err)console.log(err)
        console.log(data.rows)
        console.log(`_____________`)
        // client.end()
      })
  }

  static findingAdam(){
    client.query(`SELECT name, COUNT(votes.voter_id) AS totalVotes 
    FROM politicians JOIN votes ON votes.politician_id = politicians.id
    WHERE name LIKE 'Adam%'
    GROUP BY name`, (err,data)=>{
      if(err)console.log(err)
      console.log(data.rows)
      console.log(`_____________`)
      // client.end()
    })
  }


  static findingMaxVote(){//167
    client.query(`SELECT COUNT(votes.voter_id) AS totalVotes, name, party, location 
    FROM politicians JOIN votes ON votes.politician_id = politicians.id
    GROUP BY name, party, location
    ORDER BY 1 DESC
    LIMIT 3`,  (err,data)=>{
      if(err)console.log(err)
      console.log(data.rows)
      console.log(`_____________`)
      // client.end()
    })
  }
}

class Voters {
	static insertData() {
		let read = fs.readFileSync('voters.csv', 'utf8').split('\n');
		for (var i = 1; i < read.length; i++) {
			read[i] = read[i].split(',');
		}
		let cetak = `INSERT INTO voters (firstname,
      lastname,
      gender,
      age) VALUES`;
		for (var i = 1; i < read.length - 1; i++) {
			cetak += `('${read[i][0]}', '${read[i][1]}', '${read[i][2]}', '${read[i][3]}')${i < read.length - 2
				? ', '
				: ''}`;
		}
		// 	client.query(cetak, (err,data)=>{
		//   if(err)console.log(err)
		//   console.log(data)
		//   client.end();
		// })
  }
  
  static findWhoVotedSnow(){
    client.query(`SELECT firstname,lastname,gender,age FROM voters JOIN votes ON voters.id = votes.voter_id 
    JOIN politicians ON votes.politician_id = politicians.id
    WHERE politicians.name = 'Olympia Snowe'`, (err,data)=>{
      if(err)console.log(err)
      console.table(data.rows)
      console.log(`_____________`)
      client.end()
    })
  }
}

class Votes {
	static insertData() {
		let read = fs.readFileSync('votes.csv', 'utf8').split('\n');
		for (var i = 1; i < read.length; i++) {
			read[i] = read[i].split(',');
		}
		let cetak = `INSERT INTO votes (voter_id,
			politiciakn_id) Values`;
		for (var i = 1; i < read.length - 1; i++) {
			cetak += `('${read[i][0]}', '${read[i][1]}')${i < read.length - 2
				? ', '
				: ''}`;
    }

    
    // 		client.query(cetak, (err,data)=>{
		//   if(err)console.log(err)
		//   console.log(data)
		//   client.end();
    // })
    
   
  }
  
  static countVotes(){
    client.query(`SELECT COUNT(voter_id) AS totalVote, politicians.name
    FROM votes JOIN politicians ON votes.politician_id = politicians.id
    WHERE politicians.name = 'Olympia Snowe'
    GROUP BY politicians.name` ,(err,data)=>{
      if(err)console.log(err)
      console.log(data.rows)
      console.log(`_____________`)
    })
  }
}
 
//Relase 1 ada di SETUP.js


// Release 2 yang ke 1 
Politicians.findingData()

//Relase 2 yang ke 2 
Votes.countVotes()

//Release 2 yang ke 3
Politicians.findingAdam()

//Release 2 yang ke 4
Politicians.findingMaxVote()

//Release 2 yang ke 5
Voters.findWhoVotedSnow()