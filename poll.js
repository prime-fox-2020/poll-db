'use strict'

const db = require('./setup.js');
const file = require('./seed-data.js');
const fs = require('fs')
const json = fs.readFileSync('./db.json');
const db_status = JSON.parse(json);

const main = () => {

    let params = process.argv.slice(2);
    
    switch (params[0]) {
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

        case 'insert' || 'update' || 'delete' : {
            let query = ''

            switch (params[1]) {
                case 'voters' : query = `voters:${params[2]}`; break;
                case 'politician' : query = `politicians:${params[2]}`; break;
                case 'votes' : query = `votes:${params[2]}`; break;
            }

            switch (params[0]) {
                case 'insert' : db.insert(query.split(':')[0], query.split(':')[1]); break;
                case 'update' : db.update(query.split(':')[0], query.split(':')[1]); break;
                case 'delete' : db.delete(query.split(':')[0], query.split(':')[1]); break;
            }

        }; break;

        case 'search' : db.search(params[1], params[2]); break;
        case 'count_vote' : db.countVote(params[1]); break;
        case 'find_adam' : db.findAdam(params[1]); break;
        case 'most_votes' : db.mostVotes(); break;
        case 'retrieve_voters' : db.retrieveVoters(params[1]); break;
        case 'help' : console.clear(); console.log('wat up brooo'); break;
    }
}

main();