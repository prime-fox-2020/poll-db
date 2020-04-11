const fs = require("fs")
const politicians = fs.readFileSync("./politicians.csv", "utf8").split("\r\n")
const votes = fs.readFileSync("./votes.csv", "utf8").split("\r\n")
const voters = fs.readFileSync("./voters.csv", "utf8").split("\r\n")
const { Client } = require('pg')

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'template',
    password: '12345678',
    port: 5432,
})

client.connect()

class inserting{
    static politician(){
        let newArr = []
        let politician_text = `INSERT INTO pejabat (name,party,location,grade_current) VALUES`
        for (let i = 0; i < politicians.length; i++) {
            newArr.push(politicians[i].split(","))
        }
        for (let j = 1; j < newArr.length -1; j++) {
            politician_text += `('${newArr[j][0]}','${newArr[j][1]}','${newArr[j][2]}',${newArr[j][3]})`
            if (j < newArr.length-2){
                politician_text+=","
            }else{
                politician_text+=""
            }
        }
        client.query(politician_text, (err,res) => {
            if(err) console.log(err)

            console.log(res)
            client.end()
        })
    }
    static voters(){
        let newArr = []
        let voters_text = `INSERT INTO voters (first_name,last_name,gender,age) VALUES`
        for (let i = 0; i < voters.length; i++) {
            newArr.push(voters[i].split(","))
        }
        for (let j = 1; j < newArr.length -1; j++) {
            voters_text += `('${newArr[j][0]}','${newArr[j][1]}','${newArr[j][2]}',${newArr[j][3]})`
            if (j < newArr.length-2){
                voters_text+=","
            }else{
                voters_text+=""
            }
        }
        console.log(voters_text)
        client.query(voters_text, (err,res) => {
            if(err) console.log(err)

            console.log(res)
            client.end()
        })
    }
    static votes(){
        let newArr = []
        let votes_text = `INSERT INTO votes (voters_ID,pejabat_ID) VALUES`
        for (let i = 0; i < votes.length; i++) {
            newArr.push(votes[i].split(","))
        }
        for (let j = 1; j < newArr.length -1; j++) {
            votes_text += `(${newArr[j][0]},${newArr[j][1]})`
            if (j < newArr.length-2){
                votes_text+=","
            }else{
                votes_text+=""
            }
        }
        console.log(votes_text)
        client.query(votes_text, (err,res) => {
            if(err) console.log(err)

            console.log(res)
            client.end()
        })
    }
}

inserting.politician()
inserting.voters()
inserting.votes()