let fs = require('fs')
let client = require('./connection')

let dataK =  fs.readFileSync('./politicians.csv', 'utf8')
let dataVR =  fs.readFileSync('./voters.csv', 'utf8')
let dataV =  fs.readFileSync('./votes.csv', 'utf8')

dataK = dataK.split('\r\n')
dataVR = dataVR.split('\r\n')
dataV = dataV.split('\r\n')

dataK = dataK.slice(1)
dataVR = dataVR.slice(1)
dataV = dataV.slice(1)

temp1 = []
temp2 = []
temp3 = []

for(let a = 0; a < dataK.length; a++){
    temp1.push(dataK[a].split(','))
}
for(let a = 0; a < dataVR.length; a++){
    temp2.push(dataVR[a].split(','))
}
for(let a = 0; a < dataV.length; a++){
    temp3.push(dataV[a].split(','))
}

// console.log(temp1[0][0])
let insert1 = `INSERT INTO kandidat (nama, partai, lokasi, grade_current) VALUES`

for(let a = 0; a < temp1.length; a++){
    insert1 += `('${temp1[a][0]}', '${temp1[a][1]}', '${temp1[a][2]}', '${temp1[a][3]}')${a < temp1.length - 1 ? ',' : ''}`
}

let insert2 = `INSERT INTO voters (nama_depan, nama_belakang, gender, age) VALUES`

for(let a = 0; a < temp2.length; a++){
    insert2 += `('${temp2[a][0]}', '${temp2[a][1]}', '${temp2[a][2]}', '${temp2[a][3]}')${a < temp2.length - 1 ? ',' : ''}`
}

let insert3 = `INSERT INTO votes (id_voters, id_kandidat) VALUES`

for(let a = 0; a < temp3.length; a++){
    insert3 += `('${temp3[a][0]}', '${temp3[a][1]}')${a < temp3.length - 1 ? ',' : ''}`
}

client.connect()
client.query(insert1,(err, res)=>{
    if(err) console.log(err)

    // console.log(insert1)
    console.log(res)
    client.query(insert2,(err, res)=>{
        if(err) console.log(err)
        
        // console.log(insert2)
        console.log(res)
        client.query(insert3,(err, res)=>{
            if(err) console.log(err)
            
            // console.log(insert3)
            console.log(res)
            client.end()
        })
    })
})