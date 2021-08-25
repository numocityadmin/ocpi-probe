const {cpoPort} = require('./server-starter');
const urlbase = `http://localhost:${cpoPort}`;
const probeTokens = require('../tokens-for-probe');

module.exports = {
  urlbase,
  versionsUrl: `${urlbase}/versions/`,
  endpointsUrl: `${urlbase}/ocpi/2.2/`,
  credentialsUrl: `${urlbase}/ocpi/2.2/credentials/`,
  locationsUrl: `${urlbase}/ocpi/2.2/locations`,
  knownToken: probeTokens.tokenHeader(probeTokens.knownToken),
  incomingToken: probeTokens.tokenHeader(probeTokens.incomingToken),
};
