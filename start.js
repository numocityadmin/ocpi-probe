const {ArgumentParser} = require('argparse');
const {startServer} = require('./start-server');
const {talkToEndpoints} = require('./talk-endpoints');

const parser = new ArgumentParser({description: 'Interface Starter'});
parser.addArgument(
    ['-p', '--port'], {help: 'Port to listen. Overrides other options'});
parser.addArgument(
    ['-v', '--versions'], {help: 'URL to fetch Receiver versions'});
parser.addArgument(
    ['-s', '--status'], {
      help: 'Patch status of location LOC0001, EVSE01',
      choices: ['AVAILABLE', 'CHARGING']},
);

const port = parser.parseArgs().port;
if (port) {
  startServer(port);
} else {
  talkToEndpoints({
    ...parser.parseArgs(),
    location: 'LOC0001',
    evse: 'EVSE01',
  }).then((talkInputOk)=> {
    if (!talkInputOk) {
      console.log('Check command-line: use --help to list the arguments');
    }
  });
}
