const client = require('./config/connection');

let query = () => {
    let query1 = `SELECT name, party, grade_current FROM politician`;
    client.query(query1, (err, res) => {
        if(err) throw err;
        const table = res.rows;
    
        console.log('=-=-=-NUMBER ONE-=-=-=');
        for (let i = 0; i < table.length; i++) {
            if(table[i].party == 'R' && table[i].grade_current > 9 && table[i].grade_current < 11){
                console.log(table[i]);
            }
        }
        console.log('\n');
        
        let queryPolitician = `SELECT * from politician`;
        let queryVotes = `SELECT * from votes`;
        let queryVoters = `SELECT * from voters`;
        
        
        client.query(queryPolitician, (err, res) => {
            if(err) throw err;
            const tablePol = res.rows;
            let arr = [];
            let data = {};
        
            for (let i = 0; i < tablePol.length; i++) {
                if(tablePol[i].name == 'Olympia Snowe'){
                    client.query(queryVotes, (err, res) => {
                        if(err) throw err;
                        const tableVotes = res.rows;
                        let counter = 0;
                        for (let j = 0; j < tableVotes.length; j++) {
                            if(tableVotes[j].politician_id == 17){
                                counter++;
                            }
                        }
                        data.name = tablePol[i].name, data.totalVotes = counter;
                        arr.push(data);
                        console.log('=-=-=-NUMBER TWO-=-=-=');
                        console.log(arr);
                        console.log('\n');
        
    
                        arr = [];
                        tablePol.forEach(politician => {
                            counter = 0;
                            if(politician.name.includes('Adam')){
                                tableVotes.forEach(votes => {
                                    if(votes.politician_id == politician.id){
                                        counter++;
                                    }
                                });
                                arr.push({
                                    name: politician.name,
                                    totalVotes: counter
                                });
                            }
                        });
    
                        console.log('=-=-=-NUMBER THREE-=-=-=');
                        console.log(arr);
                        console.log('\n');
    
                        arr = [];
                        tablePol.forEach(politician => {
                            counter = 0;
                                tableVotes.forEach(votes => {
                                    if(votes.politician_id == politician.id){
                                        counter++;
                                    }
                                });
                                arr.push({
                                    totalVotes: counter,
                                    name: politician.name,
                                    party: politician.party,
                                    location: politician.location
                                });
                                arr.sort((a,b) => {
                                    return b.totalVotes - a.totalVotes;
                                });
                                if(arr.length > 3){
                                    arr.pop();
                                }
                        });
    
                        console.log('=-=-=-NUMBER FOUR-=-=-=');
                        console.log(arr);
                        console.log('\n');
    
                        client.query(queryVoters, (err, res) => {
                            if(err) throw err;
                            const tableVoters = res.rows;
                            arr = [];
    
                            tablePol.forEach(politician => {
                                tableVotes.forEach(votes => {
                                    if(votes.politician_id === politician.id && politician.name === 'Olympia Snowe'){
                                        tableVoters.forEach(voters => {
                                            if(voters.id === votes.vote_id){
                                                delete voters.id;
                                                arr.push(voters);
                                            }
                                        });
                                    }
                                }); 
                            });
                            console.log('=-=-=-NUMBER FIVE-=-=-=');
                            console.log(arr);
                            client.end();
                        })
                    })
                }
            }
        })
    })
}

module.exports = query;