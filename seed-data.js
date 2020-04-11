const fs = require('fs');
const client = require('./connection');

function seedingData(){
    let data = fs.readFileSync('./politicians.csv', 'utf8').split('\n');
    let queryy = `INSERT INTO politician (name, party, location, grade_current) VALUES`;
    let listDataArr = [];
    let values = ``;
    data.pop();
    
    // arraying the data and split
    for (let i = 1; i < data.length; i++) {
        listDataArr.push(data[i].split(','));
    }

    // make values of insert
    for (let i = 0; i < listDataArr.length; i++) {
        if(i !== listDataArr.length - 1){
            values += `('${listDataArr[i][0]}', '${listDataArr[i][1]}', '${listDataArr[i][2]}', '${listDataArr[i][3]}'), `;
        }else {
            values += `('${listDataArr[i][0]}', '${listDataArr[i][1]}', '${listDataArr[i][2]}', '${listDataArr[i][3]}');`;
        }
    }

    queryy += values; //insert + values

    client.query(queryy, (err, res) =>{
        if(err){
            console.log('!!!!!!!!!!!!!!!!');
            console.log('FAILED TO INSERT');
            console.log('!!!!!!!!!!!!!!!!');
        }else{
            data = fs.readFileSync('./voters.csv', 'utf8').split('\n');
            queryy = `INSERT INTO voters (first_name, last_name, gender, age) VALUES`;
            listDataArr = [];
            values = ``;
            data.pop();

            for (let i = 1; i < data.length; i++) {
                listDataArr.push(data[i].split(','));
            }

            for (let i = 0; i < listDataArr.length; i++) {
                for (let j = 0; j < listDataArr[i].length; j++) {
                    if(listDataArr[i][j].charAt(1) == "'"){
                        let temp = '';
                        for (let k = 0; k < listDataArr[i][j].length; k++) {
                            if(listDataArr[i][j][k] == "'"){
                                temp += "`";
                            }else{
                                temp += listDataArr[i][j][k];
                            }
                        }
                            listDataArr[i][j] = temp;
                    }
                }
            }

            for (let i = 0; i < listDataArr.length; i++) {
                if(i !== listDataArr.length - 1){
                    values += `('${listDataArr[i][0]}', '${listDataArr[i][1]}', '${listDataArr[i][2]}', '${listDataArr[i][3]}'), `;
                }else {
                    values += `('${listDataArr[i][0]}', '${listDataArr[i][1]}', '${listDataArr[i][2]}', '${listDataArr[i][3]}');`;
                }
            }

            queryy += values;

            client.query(queryy, (err, res) => {
                if(err){
                    console.log('!!!!!!!!!!!!!!!!');
                    console.log('FAILED TO INSERT');
                    console.log('!!!!!!!!!!!!!!!!');
                    console.log(err)
                } else {
                    data = fs.readFileSync('./votes.csv', 'utf8').split('\n');
                    queryy = `INSERT INTO votes (vote_id, politician_id) VALUES`;
                    listDataArr = [];
                    values = ``;
                    data.pop();

                    for (let i = 1; i < data.length; i++) {
                        listDataArr.push(data[i].split(','));
                    }

                    for (let i = 0; i < listDataArr.length; i++) {
                        if(i !== listDataArr.length - 1){
                            values += `('${listDataArr[i][0]}', '${listDataArr[i][1]}'), `;
                        }else {
                            values += `('${listDataArr[i][0]}', '${listDataArr[i][1]}');`;
                        }
                    }

                    queryy += values;

                    client.query(queryy, (err, res) => {
                        if(err){
                            console.log('!!!!!!!!!!!!!!!!');
                            console.log('FAILED TO INSERT');
                            console.log('!!!!!!!!!!!!!!!!');
                        } else {
                            console.log('=-=-=-=-=-=-=-=-=-=');
                            console.log('INSERT DATA SUCCESS');
                            console.log('=-=-=-=-=-=-=-=-=-=');
                        }
                        client.end();
                    })
                }
            })
        }
    })
}

module.exports = seedingData;