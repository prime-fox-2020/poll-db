const client = require('./connection.js')

function add(name, partai, location, grade_current, callback){
    let queryAdd = `INSERT INTO politicians (name, partai, location, grade_current) 
                      VALUES ('${name}', '${partai}', '${location}', '${grade_current}')`
    
    client.query(queryAdd, (err, data) => {
        if(err) {
            callback(err)
        } else {
            callback(null, data)
        }
    })
}

// add('akmalia', 'hacktiv', 'jakarta', '201', (err, data) => {
//     if(err) {
//         console.log(data)
//     } else {
//         console.log("add data success")
//         client.end()
//     }
// })

function delet(id, callback) {
    let queryDelete = `DELETE FROM politicians WHERE id_politicians = '${id}'`

    client.query(queryDelete, (err, data) => {
        if(err) {
            callback(err)
        } else {
            callback(null, err)
        }
    })
}

// delet('21', (err, data) => {
//     if(err){
//         console.log(err)
//     } else {
//         console.log('success delete data')
//         client.end()
//     }
// })

function update(partai, id, callback) {
    let queryUpdate = `UPDATE politicians SET partai = '${partai}' WHERE id_politicians = '${id}'`

    client.query(queryUpdate, (err, data) => {
        if(err) {
            callback(err)
        } else {
            callback(null, data)
        }
    }) 
}

// update('ijah', 23, (err, data) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log('success update data')
//         client.end()
//     }
// })