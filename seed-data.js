const {Client}=require('pg')
const fs=require('fs')


const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'poll_db',
    password: '',
    port: 5432,
  })
client.connect()

class Politicians{
    constructor(name,party,location,grade){
        this.name=name
        this.party=party
        this.location=location
        this.current_grade=grade
    }
    static input(){
      const dataPolitician=fs.readFileSync('./politicians.csv','utf8')
      const arrOfStringPoli=dataPolitician.split('\n')
      let res=[]
      for (let i = 1; i < arrOfStringPoli.length; i++) {
          const temp=arrOfStringPoli[i].split(',')
          res.push(new this(temp[0],temp[1],temp[2],temp[3]))
      }
      let query=`INSERT INTO politicians (name, party, location, grade_current) VALUES `
      res.forEach((item,idx)=>{
          query+=`('${item.name}', '${item.party}', '${item.location}', ${item.current_grade})${idx<res.length-1 ? ', ' : ''}`
      })
      // console.log(query)
      client.query(query,(err,data)=>{
          console.log(err,data)
      })
    }
}

class Voter{
    constructor(first_name,last_name,gender,age){
        this.first_name=first_name
        this.last_name=last_name
        this.gender=gender
        this.age=Number(age)
    }

    static inputvoter(){
      const dataVoter=fs.readFileSync('./voters.csv','utf8')
      const arrOfString=dataVoter.split('\n')
      let resVoter=[]
      for (let i = 1; i < arrOfString.length; i++) {
          const temp=arrOfString[i].split(',')
          resVoter.push(new this(temp[0],temp[1],temp[2],temp[3]))
      }
      // console.log(resVoter)
      let queryVoter=`INSERT INTO voters (first_name, last_name, gender, age) VALUES `
      resVoter.forEach((item,idx)=>{
          queryVoter+=`('${item.first_name}', '${item.last_name}', '${item.gender}', ${item.age})${idx<resVoter.length-1 ? ', ' : ''}`
      })
      // console.log(queryVoter)
      client.query(queryVoter,(err,data)=>{
          console.log(err,data)
      })
    }
}

class Mix{
    constructor(voter_id,politician_id){
        this.voter_id=voter_id
        this.politician_id=politician_id
        
    }
    static inputvote(){
      const dataMix=fs.readFileSync('./votes.csv','utf8')
      const arrOfStringMix=dataMix.split('\n')
      let resMix=[]
      for (let i = 1; i < arrOfStringMix.length; i++) {
          const temp=arrOfStringMix[i].split(',')
          resMix.push(new this(temp[0],temp[1]))
      }
      // console.log(resMix)
      let queryMix=`INSERT INTO politician_voter (voter_id, politician_id) VALUES `
      resMix.forEach((item,idx)=>{
          queryMix+=`(${item.voter_id}, ${item.politician_id})${idx<resMix.length-1 ? ', ' : ''}`
      })
      // console.log(queryMix)
      client.query(queryMix,(err,data)=>{
          console.log(err,data)
          client.end()
      })
    }
}

Politicians.input()
Voter.inputvoter()
Mix.inputvote()













