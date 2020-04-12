'use strict';

const {Client} = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'ArtiHidup102938',
    port: 5432
});

// client.connect();
// client.query(`SELECT name, party, grade_current FROM politicians WHERE party = 'R' AND grade_current BETWEEN 9 AND 11`, (err, result) => {
//     if (err) console.log(err);
//     else 
//         console.table(result.rows);
//         client.end();
// });

// client.connect();
// client.query(`ALTER TABLE politicians ADD COLUMN totalCount INTEGER`, (err, result) => {
//     if (err) console.log(err);
//     else console.log(result);
//     client.end();
// });

// client.connect();
// client.query(`SELECT id, name FROM politicians p WHERE name = 'Olympia Snowe'`, (err, result1) => {
//     if (err) console.log(err);
//     else 
//         client.query(`SELECT COUNT(*) FROM votes v WHERE politicianid = ${result1.rows[0].id}`, (err, result2) => {
//             if (err) console.log(err);
//             else 
//                 client.query(`UPDATE politicians SET totalCount = ${result2.rows[0].count} WHERE id = ${result1.rows[0].id}`, (err, result) => {
//                     if (err) console.log(err)
//                     else console.log(result);
//                     client.end();
//                 });
//         });
// });
client.connect();
client.query(`SELECT totalCount, name FROM politicians WHERE name = 'Olympia Snowe'`, (err, result)=>{
    if (err) console.log(err);
    else console.table(result.rows);
    client.end();
})