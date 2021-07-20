const {startServer} = require('../start-server');

const cpoPort = 9064;
before(()=> startServer(cpoPort));

module.exports = {cpoPort};
