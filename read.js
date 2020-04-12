const client = require('./connection.js')

const selectText1 =
    `SELECT name,party,grade_current FROM politicians 
    WHERE party = 'R' AND grade_current >= 9 AND grade_current <= 11;`

const selectText2 =
    `SELECT CAST(COUNT(politician_id) AS INT) as totalVote,politicians.name FROM politicians INNER JOIN votes ON politicians.id = votes.politician_id WHERE politicians.name = 'Olympia Snowe' GROUP BY politicians.name;`

const selectText3 =
    `SELECT politicians.name, COUNT(votes.politician_id) as totalVote FROM politicians INNER JOIN votes ON politicians.id = votes.politician_id WHERE politicians.name LIKE 'Adam%' GROUP BY politicians.id`

const selectText4 =
    `SELECT CAST(COUNT(votes.politician_id) AS INT ) as totalVote, politicians.name, politicians.party, politicians.location FROM politicians INNER JOIN votes ON politicians.id = votes.politician_id GROUP BY politicians.name, politicians.party, politicians.location ORDER BY totalVote DESC LIMIT 3`

const selectText5 =
    `SELECT voters.first_name, voters.last_name, voters.gender, voters.age 
     FROM voters 
     INNER JOIN votes ON voters.id = votes.voter_id 
     INNER JOIN politicians 
     ON votes.politician_id = politicians.id 
     WHERE politicians.name = 'Olympia Snowe';`

    // CODE DRIVER

client.query(selectText5,(err,res)=>{
  if(err){
    console.log(err);
  }
  else{
    console.table(res.rows);
  }
}); 