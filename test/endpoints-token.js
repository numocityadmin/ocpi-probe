const {cpoPort} = require('./server-starter');
const urlbase = `http://localhost:${cpoPort}`;

module.exports = {
  urlbase,
  versionsUrl: `${urlbase}/versions/`,
  endpointsUrl: `${urlbase}/ocpi/2.2/`,
  credentialsUrl: `${urlbase}/ocpi/2.2/credentials/`,
  locationsUrl: `${urlbase}/ocpi/2.2/locations`,
  knownToken: {headers: {Authorization: 'Token AAA_AAA_AAA'}},
  incomingToken: {headers: {Authorization: 'Token BBB_BBB_BBB'}},
};
