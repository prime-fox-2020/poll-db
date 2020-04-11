const fs = require('fs')
const client = require('./connection')

class PollDb {

  static insertPoliticians () {
    let data = fs.readFileSync('./politicians.csv','utf8').split('\n')
    let politicians = []

    for(let i = 1; i < data.length-1; i++) {
      data[i] = data[i].split(',')
      politicians.push({
        name: data[i][0],
        party: data[i][1],
        location: data[i][2],
        grade_current: data[i][3]
      })
    }

    let query_text = `INSERT INTO politicians(name, party, location, grade_current) VALUES`
    politicians.forEach((item, index) => {
      query_text += `('${item.name}', '${item.party}', '${item.location}', '${item.grade_current}')${index < politicians.length-1 ? ', ' : ''}`
    });    

    client.query(query_text, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        client.end()
      }
    })
  }

  static insertVoters () {
    let data = fs.readFileSync('./voters.csv','utf8').split('\n')
    let voters = []

    for(let i = 1; i < data.length-1; i++) {
      data[i] = data[i].split(',')
      voters.push({
        first_name: data[i][0],
        last_name: data[i][1],
        gender: data[i][2],
        age: data[i][3]
      })
    }

    let query_text = `INSERT INTO voter(first_name, last_name, gender, age) VALUES`
    voters.forEach((item, index) => {
      query_text += `('${item.first_name}', '${item.last_name}', '${item.gender}', '${item.age}')${index < voters.length-1 ? ', ' : ''}`
    });    

    client.query(query_text, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        client.end()
      }
    })
  }

  static insertVotes () {
    let data = fs.readFileSync('./votes.csv','utf8').split('\n')
    let votes = []

    for(let i = 1; i < data.length-1; i++) {
      data[i] = data[i].split(',')
      votes.push({
        voter_id: data[i][0],
        politician_id: data[i][1],
      })
    }

    let query_text = `INSERT INTO votes(voter_id, politician_id) VALUES`
    votes.forEach((item, index) => {
      query_text += `('${item.voter_id}', '${item.politician_id}')${index < votes.length-1 ? ', ' : ''}`
    });    

    client.query(query_text, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(res)
        client.end()
      }
    })
  }

  static search (party, gradeRange) {
    let low = gradeRange.split('-')[0]
    let high = gradeRange.split('-')[1]
    
    client.query(`SELECT name, party, grade_current FROM politicians WHERE party = '${party}' AND grade_current BETWEEN ${low} AND ${high}`, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`List politicians dari partai ${party} dengan grade current antara ${gradeRange}\n-------------------------------------------------------------`)
        console.table(res.rows)
        client.end()
      }
    })
  }

  static countVote(name) {
    client.query(`
      SELECT COUNT(voter_id) AS totalVote, politicians.name
      FROM votes JOIN politicians
      ON votes.politician_id = politicians.id
      WHERE politicians.name = '${name}'
      GROUP BY politicians.name
    `, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`Total Vote dari ${name}\n-------------------------------------------------------------`)
        console.table(res.rows)
        client.end()
      }
    })
  }

  static includeName(name) {
    client.query(`
      SELECT politicians.name, COUNT(voter_id) AS totalVote
      FROM votes JOIN politicians
      ON votes.politician_id = politicians.id
      WHERE politicians.name LIKE '%${name}%'
      GROUP BY politicians.name
    `, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`Total Vote untuk nama Politician yang mengandung kata ${name}\n-------------------------------------------------------------`)
        console.table(res.rows)
        client.end()
      }
    })
  }

  static mostVoted() {
    client.query(`
      SELECT COUNT(*) AS totalVote, politicians.name, politicians.party, politicians.location
      FROM votes JOIN politicians
      ON politicians.id = votes.politician_id
      GROUP BY politicians.name, politicians.party, politicians.location
      ORDER BY COUNT(*) DESC
      LIMIT 3
    `, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`3 Politician dengan Vote terbanyak\n-------------------------------------------------------------`)
        console.table(res.rows)
        client.end()
      }
    })
  }

  static searchVoter(param) {
    client.query(`
      SELECT first_name, last_name, gender, age
      FROM voter
      WHERE voter.id IN(SELECT votes.voter_id
      FROM votes JOIN politicians
      ON votes.politician_id = politicians.id
      WHERE politicians.name = '${param}'
      GROUP BY votes.voter_id, politicians.name)

    `, (err, res) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`Data Voters yang melakukan Voting kepada ${param}\n-------------------------------------------------------------`)
        console.table(res.rows)
        client.end()
      }
    })
  }
}

/* Input data politicians dari file csv ke dalam table database */
// PollDb.insertPoliticians() 

/* Input data voter dari file csv ke dalam table database */
// PollDb.insertVoters() 

/* Input data vote dari file csv ke dalam table database */
// PollDb.insertVotes() 

// PollDb.search('R', '8-11') /* <<- Memnampilkan data politician berdasarkan nama partai dan rentang grade_current. contoh Input: PollDb.search('R', '8-11') */
// PollDb.countVote('Olympia Snowe') /* <<- Menghitung jumlah vote sesuai dengan nama politician yg diinput */
// PollDb.includeName('Adam') /* <<- Menghitung jumlah vote yang namanya mengandung kata yang diinput */
// PollDb.mostVoted() /* <<- Menampilkan 3 Politician yg memiliki vote terbanyak */
// PollDb.searchVoter('Olympia Snowe') /* Menampilkan data voter yg melakukan voting kepada politician yg diinput */