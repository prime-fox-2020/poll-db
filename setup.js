'use strict';

const fs = require('fs');
const {Client} = require('pg');

function queryCommand(path, callback) {
    fs.readFile(path, 'utf8', (err, datas) => {
        if (err) console.log(err);
        let slashIndex = 0;
        let dotIndex = 0; 
        for (let i = 0; i < path.length; i++) {
            if (path[i] == '/') {slashIndex = i;}
            else if (path[i] == '.') {dotIndex = i;}
        }
        const tableName = path.slice(slashIndex+1, dotIndex);
        datas = datas.split('\n');
        const identifier = datas[0].split(',');
        datas = datas.slice(1);
        let insert_query = `INSERT INTO ${tableName} (`;
        let create_query = `CREATE TABLE ${tableName} (id SERIAL PRIMARY KEY, `;
        const var_type = [];
        const var_length = [];

        for (let [i, property] of identifier.entries()) {
            insert_query += property;
            if (i != identifier.length -1) insert_query += ', ';
            // Check data type (character or number)
            const data = datas[0].split(',');
            if (isNaN(Number(data[i]))) var_type.push('CHAR');
            else var_type.push('INTEGER');
            var_length.push(0);
        }

        insert_query += ') VALUES ';
        for (let [index, entries] of datas.entries()) {
            entries = entries.split(',');
            insert_query += '(';
            for (let [idx, data] of entries.entries()) {
                if (idx != entries.length-1) insert_query += `'${data}', `;
                else insert_query += `${data}`;
                // Check if CHAR or VARCHAR or INTEGER OR REAL
                if (var_type[idx] == 'VARCHAR' && data.length > var_length[idx]) {
                    var_length[idx] = data.length;
                } else if (var_type[idx] == 'INTEGER' && data%1 != 0) {
                    var_type[idx] = 'REAL';
                } else if (var_type[idx] == 'CHAR' && data.length > 1) {
                    var_type[idx] = 'VARCHAR';
                    var_length[idx] = data.length;
                }
            }
            insert_query += ')';
            if (index != datas.length-1) insert_query += ', ';
        }

        for (let [i, variable] of var_type.entries()) {
            create_query += `${identifier[i]} ${var_type[i]}${var_type[i] == 'VARCHAR' ? `(${var_length[i]})` : ''}${i != var_type.length-1 ? ', ': ')'}`;
        }
        callback(null, [create_query, insert_query]);
    });
}

function makeTable(queryCommand, client, file, lastFile) {
    const create_query = queryCommand[0];
    const insert_query = queryCommand[1];
    client.query(create_query, (err, result) => {
        if (err) console.log(err);
        else {
            console.log(result);
            client.query(insert_query, (err, result) => {
                if (err) console.log(err);
                else 
                    console.log(result);
                    if (file == lastFile) {client.end();}
                });
            }
    });
}

function csvToDB(pathArray, client) {
    for (let [index, path] of pathArray.entries()) {
        queryCommand(path, (err, data) => {
            if (err) console.log(err);
            else {
                if (path == pathArray[0]) client.connect();
                makeTable(data, client, index, pathArray.length-1);
            }
        });
    }
}

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'ArtiHidup102938',
    port: 5432
});

const filePath = ['./politicians.csv', './voters.csv', './votes.csv'];
// Driver code
csvToDB(filePath, client);