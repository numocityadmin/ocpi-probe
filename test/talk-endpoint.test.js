const {expect} = require('chai');
const {fetchEndpoint} = require('../fetch-endpoint');
const {talkToEndpoints} = require('../talk-endpoints');
const nock = require('nock');

const endpointsUrl = `http://example-emsp.com/ocpi/2.2/`;
const locationsUrl = `http://example-emsp.com/locations/`;

function setupReceiverMock() {
  nock('http://example-emsp.com').get('/ocpi/versions/')
      .reply(200, [{
        version: '2.2',
        url: endpointsUrl,
      }]);
  nock(endpointsUrl).get('/').reply(200, [
    {
      identifier: 'credentials',
      role: 'RECEIVER',
      url: `http://example-emsp.com/credentials/`,
    }, {
      identifier: 'locations',
      role: 'RECEIVER',
      url: locationsUrl,
    }]);
}

it('fetches an endpoint when it exists', async ()=> {
  setupReceiverMock();
  const locationsReceiverUrl = await fetchEndpoint({
    moduleName: 'locations',
    role: 'RECEIVER',
    versionsUrl: 'http://example-emsp.com/ocpi/versions/',
  });
  expect(locationsReceiverUrl).equals(locationsUrl);
});

it('talks to locations endpoint as passed from command line', async ()=> {
  setupReceiverMock();
  nock(locationsUrl).patch('/IN/NMC/LOC0001/EVSE01', (body)=> {
    // TODO: Assert the body here
    return true;
  }).reply(200);

  const parsedCmdline = {
    versions: 'http://example-emsp.com/ocpi/versions/',
    location: 'LOC0001',
    evse: 'EVSE01',
    status: 'Available',
  };
  expect(await talkToEndpoints(parsedCmdline)).to.be.true;
});
