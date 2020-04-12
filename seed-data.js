const fs = require('fs')
const client = require('./connection')

class SeedData {
    static getPoliticians(){
        let politiciansRaw = fs.readFileSync('./politicians.csv', 'utf8').split('\r\n')
        let politiciansArrayBreakdown = politiciansRaw.slice(1).map(x => x.split(','))
        let politiciansColumns = politiciansRaw[0]
        let politiciansData = ''
        politiciansArrayBreakdown.map(row => politiciansData += `('${row[0]}','${row[1]}','${row[2]}',${Number(row[3])}),`)
        let query = `INSERT INTO politicians (${politiciansColumns}) VALUES ${politiciansData.slice(0,-1)}`
        return query
    }

    static getVoters(){
        let votersRaw = fs.readFileSync('./voters.csv', 'utf8').split('\r\n')
        let votersArrayBreakdown = votersRaw.slice(1).map(x => x.split(','))
        let votersColumns = votersRaw[0]
        let votersData = ''
        votersArrayBreakdown.map(row => votersData += `('${row[0]}','${row[1]}','${row[2]}',${Number(row[3])}),`)
        let query = `INSERT INTO voters (${votersColumns}) VALUES ${votersData.slice(0,-1)}`
        return query
    }

    static getVotes(){
        let votesRaw = fs.readFileSync('./votes.csv', 'utf8').split('\r\n')
        let votesArrayBreakdown = votesRaw.slice(1).map(x => x.split(','))
        let votesColumns = votesRaw[0]
        let votesData = ''
        votesArrayBreakdown.map(row => votesData += `(${Number(row[0])},${Number(row[1])}),`)
        let query = `INSERT INTO votes (${votesColumns}) VALUES ${votesData.slice(0,-1)}`
        return query
    }

    static seedAll(){
        client.connect()
        client.query(this.getPoliticians(), (err) => {
            if (err) {
              console.log(err)
              client.end()
            } else {
                console.log('success')
                client.query(this.getVoters(), (err) => {
                    if (err) {
                      console.log(err)
                      client.end()
                    } else {
                        console.log('success')
                        client.query(this.getVotes(), (err) => {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log('success')
                            }
                            client.end()
                        })
                    }
                })
            }
        })
    }
}

SeedData.seedAll()
