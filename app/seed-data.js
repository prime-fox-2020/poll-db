const fs = require('fs')
const {Client} = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db-poll',
    password: 'postgres',
    port: 5432,
})

class DataSeeding{
    static seedingPoliticans(){
        const data = fs.readFileSync('../data/politicians.csv', 'utf8').split('\n')
        const tableColumn = data[0]
        const value = data.slice(1)
        let query_text = `INSERT INTO politicians (${tableColumn}) VALUES `
        for(let i = 0; i < value.length; i++){
            const temp = value[i].split(',')
            query_text += `('${temp[0]}', '${temp[1]}', '${temp[2]}', '${temp[3]}')`
            if(i < value.length-1) query_text += ', '
            else query_text += ''
        }
        client.connect()

        client.query(query_text, (err, res) => {
            if(err){
                console.log(err)
                client.end()
            }
            else{
                console.log('Seeding table politicians...')
            }
            client.end()
        })
        
    }

    static seedingVoters(){
        const data = fs.readFileSync('../data/voters.csv', 'utf8').split('\n')
        const tableColumn = data[0]
        const value = data.slice(1)
        let query_text = `INSERT INTO voters (${tableColumn}) VALUES `
        for(let i = 0; i < value.length; i++){
            const temp = value[i].split(',')
            query_text += `('${temp[0]}', '${temp[1]}', '${temp[2]}', ${temp[3]})`
            if(i < value.length-1) query_text += ', '
            else query_text += ''
        }
        client.connect()

        client.query(query_text, (err, res) => {
            if(err){
                console.log(err)
                client.end()
            }
            else{
                console.log('Seeding table voters...')
            }
            client.end()
        })
        
    }

    static seedingVotes(){
        const data = fs.readFileSync('../data/votes.csv', 'utf8').split('\n')
        const tableColumn = data[0]
        const value = data.slice(1)
        let query_text = `INSERT INTO votes (${tableColumn}) VALUES `
        for(let i = 0; i < value.length; i++){
            const temp = value[i].split(',')
            query_text += `(${temp[0]}, ${temp[1]})`
            if(i < value.length-1) query_text += ', '
            else query_text += ''
        }
        client.connect()

        client.query(query_text, (err, res) => {
            if(err){
                console.log(err)
                client.end()
            }
            else{
                console.log('Seeding table votes...')
            }
            client.end()
        })
        
    }
}

//Harus dijalankan satu-satu karena satu sama lain merupakan proses async dan hanya dapat dijalankan dengan 1 client connect

DataSeeding.seedingPoliticans()
// DataSeeding.seedingVoters()
// DataSeeding.seedingVotes()