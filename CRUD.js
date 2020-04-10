const { Client } = require('pg');
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'db_poll',
    password: 'admin',
    port: 5432,
})
console.clear();

class Manipulation {

    static db(query, msg) {
        client.connect()
        client.query(query, (err, res) => {
            if (err) {
                console.log(err)
            } else {
                console.clear();
                console.log(msg);
            }
            client.end()
        })
    }

    static add(table, param1, param2, param3 = null, param4 = null) {
        let insertQuery
        switch (table) {
            case 'politicians':
                insertQuery = `INSERT INTO politicians (name,party,location,grade_current) VALUES ('${param1}','${param2}','${param3}','${param4}')`
                break;
            case 'voters':
                insertQuery = `INSERT INTO voters (first_name,last_name,gender,age) VALUES ('${param1}','${param2}','${param3}','${param4}')`
                break;
            case 'votes':
                insertQuery = `INSERT INTO votes (voterId,politicianId) VALUES ('${param1}','${param2}')`
                break;
            default:
                console.log('Table no yet created');
                break;
        }
        this.db(insertQuery, `Sedding ${table}`)
    }

    static update(table, id, params) {
        let insertQuery
        switch (table) {
            case 'politicians':
                insertQuery = `UPDATE politicians SET ${params} WHERE id = ${id}`
                break;
            case 'voters':
                insertQuery = `UPDATE voters SET ${params} WHERE id = ${id}`
                break;
            case 'votes':
                insertQuery = `UPDATE votes SET ${params} WHERE id = ${id}`
                break;
            default:
                console.log('Table no yet created');
                break;
        }
        this.db(insertQuery, `Update ${table} with id : ${id}`)
    }

    static delete(table, id) {
        let insertQuery
        switch (table) {
            case 'politicians':
                insertQuery = `DELETE FROM politicians WHERE id = ${id}`
                break;
            case 'voters':
                insertQuery = `DELETE FROM voters WHERE id = ${id}`
                break;
            case 'votes':
                insertQuery = `DELETE FROM votes WHERE id = ${id}`
                break;
            default:
                console.log('Table no yet created');
                break;
        }
        this.db(insertQuery, `Delete id : ${id} from ${table}`)
    }
}


// NOTE : HARUS DIJALANKAN SATU PERSATU KARENA MENGGUNAKANA CALL BACK client.end() 
// Manipulation.add('politicians', 'susilo', 'T', 'BN', '12.937634235')
// Manipulation.add('voters', 'susilo', 'hartomo', 'male', 23)
// Manipulation.add('votes', 2, 151)

// Manipulation.update('politicians', 21, "name = 'encusilo dinomo'")
// Manipulation.update('voters',151, "first_name = 'encusilo'")
Manipulation.update('votes',164,'voterId = 151, politicianId = 2')

module.exports = {
    Manipulation
};

