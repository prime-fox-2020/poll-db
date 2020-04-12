const client = require("./connection.js")

function deleteData (table,condition){
    let temp = `DELETE FROM ${table} WHERE ${table}_id = ${condition}`

    client.query(temp, (err, data) => {
        if(err) {
            console.log(err)
        }else{
            console.log(`sukses menghapus data`)
        }
        client.end()
    })
}
// deleteData('politician', '2')


function insertPolitician(name, party, location, grade_current) {
    let text = `INSERT into politicians (name, party, location, grade_current) VALUES`
    let values = [name, party, location, grade_current]
    text += ` ($1, $2, $3, $4)`

    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('sukses menambah data politician')
      }
      client.end()
    })
  }
// insertPolitician ('Bram','PDI','Bandung',5)

function insertVoters(first_name, last_name, gender, age) {
    let text = `INSERT into voters (first_name, last_name, gender, age) VALUES`
    let values = [first_name, last_name, gender, age]
    text += ` ($1, $2, $3, $4)`

    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('sukses menambah data voters')
      }
      client.end()
    })
  }
// insertVoters('singgit','bram','pria',9)

function insertVotes(voter_id, politician_id) {
    let text = `INSERT INTO vote (voter_id, politician_id) VALUES`
    let values = [voter_id, politician_id]
    text += ` ($1, $2)`

    client.query(text, values, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('sukses menambah data votes')
      }
      client.end()
    })
  }
//   insertVotes(33,68)

function updatePoliticians(id, attribute, value) {
    let query = 'UPDATE politicians SET ' + attribute + ` = $1 WHERE politician_id = ${id};`
    let values = [value]
    client.query(query, values, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('sukses mengupdate data politicians')
      }
      client.end();
    })
  }
//   updatePoliticians(3, 'name', 'domz')

function updateVoters(id, attribute, value) {
    let query = 'UPDATE voters SET ' + attribute + ` = $1 WHERE voter_id = ${id};`
    let values = [value]
    client.query(query, values, (err, res) => {
      if (err) {
        console.log(err)
      } else {
        console.log('sukses mengupdate data voters')
      }
      client.end();
    })
  }
//   updateVoters(4, 'age', 10000)

  function updateVotes(id, attribute, value) {
    let query = 'UPDATE vote SET ' + attribute + ` = $1 WHERE vote_id = ${id};`
    let values = [value]
    client.query(query, values, (err, res) => {
      if (err) {
        console.log(err,`ini error`)
      } else {
        console.log('sukses mengupdate data voters')
      }
      client.end();
    })
  }
//   updateVoters(7, 'politician_id', 555) 