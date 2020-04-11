//your code here
const {Client} = require('pg');
const fs = require('fs');
const json = fs.readFileSync('./db.json');
const client = new Client({
    user: 'node',
    host: 'localhost',
    database: 'polldb',
    password: 'hacktiv8tugas',
    port: 5432
});

class Backend {

    static create() {

        let query = 'CREATE TABLE politicians (\n';
        query += ' pol_id serial primary key,\n name varchar(25) not null,\n party varchar(25) not null';
        query += ',\n location varchar(25),\n grade_current integer);\n';
        query += 'CREATE TABLE voters (\n';
        query += ' voters_id serial primary key,\n first_name varchar(50) not null,\n last_name varchar(50) not null,\n';
        query += ' gender varchar(15),\n age integer);';
        query += 'CREATE TABLE votes (\n';
        query += ' id serial primary key,\n pol_id serial REFERENCES politicians(pol_id),\n voters_id serial REFERENCES voters(voters_id));'

        this.executeQuery(query, '\nCreate 3 tables at once\n');
        let db_status = JSON.parse(json);
        db_status[0].db_status = 'created';
        this.savingDBStatus(db_status);

        return this
        
    }

    static bulkInsert(data) {
        let table = '', {polSQL, votersSQL, votesSQL} = '';

        for (let i = 0; i < data.length; i++) {

            switch (data[i][0]) {
                case 'switch_to_pol' : table = 'politicians'; polSQL = 'INSERT INTO politicians (name, party, location, grade_current) VALUES \n'; i++; break;
                case 'switch_to_voters' : table = 'voters'; votersSQL = 'INSERT INTO voters (first_name, last_name, gender, age) VALUES \n'; i++; break;
                case 'switch_to_votes' : table = 'votes'; votesSQL = 'INSERT INTO votes (voters_id, pol_id) VALUES \n'; i++; break;
            }

            switch (table) {
                case 'politicians' : {
                    polSQL += `('${data[i].toString().split(',')[0]}', '${data[i].toString().split(',')[1]}', '${data[i].toString().split(',')[2]}', ${Number(data[i].toString().split(',')[3])}),\n`
                }; break;
                
                case 'voters' : {
                    votersSQL += `('${data[i].toString().split(',')[0]}', '${data[i].toString().split(',')[1]}', '${data[i].toString().split(',')[2]}', ${Number(data[i].toString().split(',')[3])}),\n`
                }; break;

                case 'votes' : {
                    votesSQL += `(${Number(data[i].toString().split(',')[0])}, ${Number(data[i].toString().split(',')[1])}),\n`
                }; break;
            }
        }

        let SQL = `${polSQL.trim().replace(/,$/g, ';')}\n${votersSQL.trim().replace(/,$/g, ';')}\n${votesSQL.trim().replace(/,$/g, ';')}`;
        this.executeQuery(SQL, 'Copying data from JSON....')
    }

    static insert(table, values) {
        let params = '', queryString = '';
        values = values.split(',');
        
        switch (table) {
            case 'voters' : {
                params = 'first_name, last_name, gender, age'; 
                queryString = `VALUES ('${values[0]}', '${values[1]}', '${values[2]}', ${+values[3]})`;
            }; break;
            case 'votes' : {
                params = 'voters_id, pol_id';
                queryString = `VALUES (${+values[0]}, ${+values[1]})`
            }; break;
            case 'politicians' : {
                params = 'name, party, location, grade_current';
                queryString = `VALUES ('${values[0]}', '${values[1]}', '${values[2]}', ${+values[3]})`
            }; break;
        }

        let query = `INSERT INTO ${table} (${params}) ${queryString};`;
        this.executeQuery(query, `inserting ...... ${values} into table ${table}`)
    }

    static executeQuery(query, messages) {
        client.connect();
        client.query(query)
            .then(result => {messages == undefined ? console.table(result.rows) : console.log(messages)})
            .catch(err => console.log(err))
            .then(() => {console.log(`Done !\n`); client.end()})
    }

    static update(table, values) {
        let queryString = '';
        values = values.split(',');

        switch (table) {
            case 'voters' : {
                queryString = `SET (first_name = '${values[0]}', last_name = '${values[1]}', gender = '${values[2]}', age = ${+values[3]})`;
            }; break;
            case 'votes' : {
                console.log('Once the voters vote, you cannot change the votes result'); return;
            };
            case 'politicians' : {
                queryString = `SET (name = '${values[0]}', party = '${values[1]}', location = '${values[2]}')`
            }; break;
        }

        let query = `UPDATE ${table} ${queryString};`;
        this.executeQuery(query, `updating --> ${values} from table ${table}`)
    }

    static delete(table, id) {

        let params = '';
        switch (table) {
            case 'voters' : params = 'voters_id'; break;
            case 'politicians' : params = 'pol_id'; break;
        }

        let query = `DELETE FROM ${table} WHERE ${params} = ${id}`;
        this.executeQuery(query, `Deleting --> ${table} where id = ${id}`)
    }

    static search(table, queryString) {
        // for release 3 sub-release (1)
        queryString = queryString || 'R:9:11';

        let query = `SELECT * FROM ${table} WHERE party = '${queryString.split(':')[0]}' AND grade_current BETWEEN ${Number(queryString.split(':')[1])} AND ${Number(queryString.split(':')[2])};`
        this.executeQuery(query)
    }

    static countVote(politicianName) {
        // for release 3 sub-release (2)
        politicianName = politicianName || 'Olympia Snowe';

        let query = `SELECT pol.name, count(v.id) AS totalVotes FROM politicians AS pol, votes AS v WHERE v.pol_id = pol.pol_id AND pol.name = '${politicianName}' GROUP BY pol.name;`
        this.executeQuery(query)
    }

    static findAdam(politicianName) {
        // for release 3 sub-release (3)
        politicianName = politicianName || 'Adam';

        let query = `SELECT * FROM politicians WHERE name LIKE '%${politicianName}%' ORDER BY name ASC;`;
        this.executeQuery(query)
    }

    static mostVotes() {
        // for release 3 sub-release (4)
        let query = 'SELECT pol.name, pol.party, COUNT(v.id) AS TOTAL_VOTES FROM politicians AS pol, votes AS v ';
            query += 'WHERE v.pol_id = pol.pol_id GROUP BY pol.name, pol.party ORDER BY TOTAL_VOTES DESC LIMIT 3;';
        this.executeQuery(query)
    }

    static retrieveVoters(politicianName) {
        // for release 3 sub-release (5)
        politicianName = politicianName || 'Olympia Snowe';

        let query = 'select vot.first_name, vot.last_name, vot.gender, vot.age from ';
            query += 'politicians as pol, voters as vot, votes as v where v.pol_id = pol.pol_id ';
            query += `and v.voters_id = vot.voters_id and pol.name ='${politicianName}';`;

        this.executeQuery(query)
    }
    
    static savingDBStatus(data) {
        fs.writeFileSync('./db.json', JSON.stringify(data, null, 2))
    }
    static end() {
        client.end();
    }
}

module.exports = Backend;