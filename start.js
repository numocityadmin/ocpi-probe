const {ArgumentParser} = require('argparse');
const {startServer} = require('./start-server');

const parser = new ArgumentParser({description: 'Interface Starter'});
parser.addArgument(['-p', '--port'], {help: 'Port to listen'});
startServer(parser.parseArgs().port);
