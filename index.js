const command = process.argv[2];

switch(command){
    case 'setup':
        const setup = require('./setup');
        setup();
        break;
    case 'seed':
        const seed = require('./seed-data');
        seed();
        break;
    case 'query':
        let query = require('./query');
        query();
        break;
    default:
        console.log('Wrong input!');
        break;
}