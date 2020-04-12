const fs = require('fs');
const client = require('./connection');

let politic = fs.readFileSync("./politicians.csv","utf8");
let voters = fs.readFileSync("./voters.csv","utf8");
let votes = fs.readFileSync("./votes.csv","utf8");

politic = politic.split("\n").slice(1);
voters = voters.split("\n").slice(1);
votes = votes.split("\n").slice(1);

temp1 = [];
temp2 = [];
temp3 = [];

for (let i = 0; i < politic.length-1; i++) {
  temp1.push(politic[i].split(","))
}
for (let i = 0; i < voters.length-1; i++) {
  temp2.push(voters[i].split(","))
}
for (let i = 0; i < votes.length-1; i++) {
  temp3.push(votes[i].split(","))
}

//console.log(temp1[0][0]);
let insert1 = `INSERT INTO kandidat (nama, partai, lokasi, grade_current) VALUES`

for (let i = 0; i < temp1.length; i++) {
  insert1 += `('${temp1[i][0]}', '${temp1[i][1]}', '${temp1[i][2]}', '${temp1[i][3]}')${i < temp1.length -1 ? ',' : ''}`
}
// console.log(insert1);
let insert2 = `INSERT INTO voters (nama_depan, nama_belakang, gender, age) VALUES`

for (let i = 0; i < temp2.length; i++) {
  insert2 += `('${temp2[i][0]}', '${temp2[i][1]}', '${temp2[i][2]}', '${temp2[i][3]}')${i < temp2.length -1 ? ',' : ''}`
}
// console.log(insert2);
let insert3 = `INSERT INTO votes (id_voters, id_kandidat) VALUES`

for (let i = 0; i < temp3.length; i++) {
  insert3 += `('${temp3[i][0]}', '${temp3[i][1]}')${i < temp3.length -1 ? ',' : ''}`
}
// console.log(insert3);
client.connect();
client.query(insert1,(err, res) => {
  if(err) console.log(err);

  //console.log(insert1);
  console.log(res);
  client.query(insert2, (err, res) => {
    if(err) console.log(err);

    //console.log(insert2);
    console.log(res);
    client.query(insert3, (err, res) => {
      if(err) console.log(err);

      //console.log(insert3);
      console.log(res);
      client.end();
    })
  })
})
