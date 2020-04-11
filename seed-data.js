const fs = require('fs');
const politician = './politicians.csv';
const voters = './voters.csv';
const votes = './votes.csv';

class Seeding {

    static startSeeding(callback) {
        let cache = [['switch_to_pol']];
        let polData = fs.readFileSync(politician).toString().split('\n');
        let votersData = fs.readFileSync(voters).toString().split('\n');
        let votesData = fs.readFileSync(votes).toString().split('\n');

        for (let i = 1; i < polData.length; i++) {
            cache.push(polData[i].split(','))
        }
        
        cache.push(['switch_to_voters']);

        for (let i = 1; i < votersData.length; i++) {
            cache.push(votersData[i].split(','))
        }

        cache.push(['switch_to_votes']);

        for (let i = 1; i < votesData.length; i++) {
            cache.push(votesData[i].split(','))
        }

        callback(cache)
    }
}

module.exports = Seeding;