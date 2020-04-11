const client = require('./connections.js')
const command = process.argv[2]
const params = process.argv.slice(3)
console.log('commmand :', command);
console.log('params: ', params);

switch(command) {
    case 'list:politicians':
        showList(command, function(hasil) {
            console.log('========== POLITICIANS LIST ==========');
            console.table(hasil);
        });
        break;
    
    case 'list:voters':
        showList(command, function(hasil) {
            console.log('========== VOTERS LIST ==========');
            console.table(hasil);
        });
        break;

    case 'add:columns': // tambahkan input <nama table (politicians/voters)> <nama kolom baru> <tipe data(TEXT/INTEGER)>
        addNewColumn(params, function(hasil) {
            console.log(hasil);
        });
        break;
    
    case 'delete:data': // tambahkan input <nama table (politicians/voters)> <data id>
        deleteDataById(params, function(hasil) {
            console.log(hasil);
        });
        break;
    
    case 'update:data': // tambahkan input <nama table (politicians/voters)> <data id> <nama kolom> <value>
        updateData(params, function(hasil) {
            console.log(hasil);
        });
        break;

    default:
        console.log('kosongan');
        client.end()
        break;
}

function showList(cmd, callback) {
    if (cmd === 'list:politicians') {
        const politiciansTable = `SELECT * FROM politicians
        ORDER BY id ASC;`
        client.query(politiciansTable, function(err, res) {
            if (err) {
                callback(err)
            } else {
                callback(res.rows)
            }
            client.end()
        })
    } else if (cmd === 'list:voters') {
        const votersTable = `SELECT * FROM voters
        ORDER BY id ASC;`
        client.query(votersTable, function(err, res) {
            if (err) {
                callback(err)
            } else {
                callback(res.rows)
            }
            client.end()
        })
    }
}

function addNewColumn(inputs, callback) {
    // tambahkan input <nama table (politicians/voters)> <nama kolom baru> <tipe data(TEXT/INTEGER)>
    let nama_table = inputs[0]
    let nama_kolom = inputs[1]
    let tipe_data = inputs[2]
    if (nama_table) {
        let kolomBaru = `ALTER TABLE ${nama_table}
        ADD COLUMN ${nama_kolom} ${tipe_data};
        SELECT * FROM ${nama_table};
        `
        client.query(kolomBaru, (err, data) => {
            if (err) {
                callback(err)
            } else {
                let pesan = 'Berhasil menambahkan kolom ' + nama_kolom + ' pada table ' + nama_table 
                callback(pesan)
                client.end()
            }
        })
    }
}

function deleteDataById(inputs, callback) {
    // tambahkan input <nama table (politicians/voters)> <data id>
    let nama_table = inputs[0]
    let id_data = inputs[1]
    if (nama_table) {
        let hapusData = `DELETE FROM ${nama_table}
        WHERE id = ${id_data};
        SELECT * FROM ${nama_table};
        `
        client.query(hapusData, (err, data) => {
            if (err) {
                callback(err)
            } else {
                let pesan = 'Berhasil menghapus data id ' + id_data + ' pada table ' + nama_table 
                callback(pesan)
                client.end()
            }
        })
    }
}

function updateData(inputs, callback) {
    // input <nama table> <data id> <nama kolom> <value>
    let nama_table = inputs[0]
    let id_data = inputs[1]
    let nama_kolom = inputs[2]
    let data_value = inputs[3]
    if (nama_table) {
        let updateDataById = `UPDATE ${nama_table}
        SET ${nama_kolom} = '${data_value}'
        WHERE id = ${id_data};
        SELECT * FROM ${nama_table};
        `
        client.query(updateDataById, (err, data) => {
            if (err) {
                callback(err)
            } else {
                let pesan = 'Berhasil update data dengan id ' + id_data + ' pada table ' + nama_table 
                callback(pesan)
                client.end()
            }
        })
    }
}

