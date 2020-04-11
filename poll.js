'use strict'

const db = require('./setup.js');
const file = require('./seed-data.js');
const fs = require('fs')
const json = fs.readFileSync('./db.json');
const db_status = JSON.parse(json);

const main = () => {

    let params = process.argv.slice(2);
    
    switch (params[0].toUpperCase()) {
        case 'setup' : {
            if (db_status[0].db_status !== 'created') {
                db.create();
            } else {
                console.log(`\nDatabase already been created\n`)
                return;
            }

        }; break;

        case 'start:seed' : {
            file.startSeeding(result => {
                db.bulkInsert(result)
            });
        }; break;

        // Release 2.1
        case 'R21' : db.search(params[1], params[2]); break;
        // Release 2.2
        case 'R22' : db.countVote(params[1]); break;
        // Release 2.3
        case 'R23' : db.findAdam(params[1]); break;
        // Release 2.4
        case 'R24' : db.mostVotes(); break;
        // Release 2.5
        case 'R25' : db.retrieveVoters(params[1]); break;
        case 'help' : console.clear(); console.log('wat up brooo'); break;
    }
}

main();