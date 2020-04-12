//insert to client
const fs = require('fs')
const client = require('./connection')

let text
let insertData


//POLITIC
function politicans() {

    text = 'INSERT INTO politicians (name, party, location, grade_current) VALUES ';
    insertData = [];

    let getCSV = fs.readFileSync('./politicians.csv', 'utf-8').split('\r\n');
    for (let i = 1; i < getCSV.length; i++) {
        if (getCSV[i]) {
            let tempSplit = getCSV[i].split(',');
            let name = tempSplit[0].replace("'", "''");
            let party = tempSplit[1].replace("'", "''");
            let location = tempSplit[2].replace("'", "''");
            let grade_current = tempSplit[3];
            insertData.push(`('${name}', '${party}', '${location}', '${grade_current}')`);
        }
    }
    text += insertData.join(', ') + ';';

    client.query(text, (err, res) => {
        if (err) {
            throw (err);
        } else {
            console.log('"politicans" berhasil!');
        }
    });
}

function voters() {

    text = 'INSERT INTO voters (first_name, last_name, gender, age) VALUES ';
    insertData = [];

    getCSV = fs.readFileSync('./voters.csv', 'utf-8').split('\r\n');
    for (let i = 1; i < getCSV.length; i++) {
        if (getCSV[i]) {
            let tempSplit = getCSV[i].split(',');
            let first_name = tempSplit[0].replace("'", "''");
            let last_name = tempSplit[1].replace("'", "''");
            let gender = tempSplit[2].replace("'", "''");
            let age = tempSplit[3];
            insertData.push(`('${first_name}', '${last_name}', '${gender}', '${age}')`);
        }
    }
    text += insertData.join(', ') + ';';

    client.query(text, (err, res) => {
        if (err) {
            throw (err);
        } else {
            console.log('"voters" berhasil!');
        }
    });
}


function votes() {

    text = 'INSERT INTO votes (voter_id, politician_id) VALUES ';
    insertData = [];

    getCSV = fs.readFileSync('./votes.csv', 'utf-8').split('\r\n');
    for (let i = 1; i < getCSV.length; i++) {
        if (getCSV[i]) {
            let tempSplit = getCSV[i].split(',');
            let voters_id = tempSplit[0];
            let politician_id = tempSplit[1];
            insertData.push(`('${voters_id}', '${politician_id}')`);
        }
    }
    text += insertData.join(', ') + ';';

    client.query(text, (err, res) => {
        if (err) {
            throw (err);
        } else {
            console.log('"votes" berhasil!');
            client.end();
        }
    });
}

politicans()
voters()
votes()