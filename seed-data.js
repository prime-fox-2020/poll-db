'use strict'
const { Client } = require('pg');
const fs = require('fs');

const client = new Client({
  user: 'pipop',
  host: 'localhost',
  database: 'pollDB',
  password: 'qwerty1234',
  port: 5432,
})

client.connect();

class DataBase {

  static insertVoters(){
    const data = fs.readFileSync('./voters.csv', 'utf8').split(`\n`).slice(1);
    let insert = `INSERT INTO voters (first_name, last_name, gender, age) VALUES `;
    data.forEach((dt, index) => {
      const tempData = dt.split(',');
      insert += `('${tempData[0]}', '${tempData[1]}', '${tempData[2]}', ${tempData[3]})`;
      if(index < data.length-1) insert += ', ';
    });

    client.query(insert, (err, res) => {
      if(err) throw err;
      console.log(res);
    });
  }

  static insertPoliticians(){
    const data = fs.readFileSync('./politicians.csv', 'utf8').split(`\n`).slice(1);
    let insert = `INSERT INTO politicians (name, party, location, grade_current) VALUES `;
    data.forEach((dt, index) => {
      const tempData = dt.split(',');
      insert += `('${tempData[0]}', '${tempData[1]}', '${tempData[2]}', ${tempData[3]})`;
      if(index < data.length-1) insert += ', ';
    });
    client.query(insert, (err, res) => {
      if(err) throw err;
      console.log(res);
    });
  }

  static insertVotes(){
    const data = fs.readFileSync('./votes.csv', 'utf8').split(`\n`).slice(1);
    let insert = `INSERT INTO votes (voterId, politicianId) VALUES `;
    data.forEach((dt, index) => {
      const tempData = dt.split(',');
      insert += `(${tempData[0]}, ${tempData[1]})`;
      if(index < data.length-1) insert += ', ';
    });
    client.query(insert, (err, res) => {
      if(err) throw err;
      console.log(res);
      client.end();
    });
  }
}

DataBase.insertVoters();
DataBase.insertPoliticians();
DataBase.insertVotes();

