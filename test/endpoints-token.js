const {cpoPort} = require('./server-starter');
const urlbase = `http://localhost:${cpoPort}`;

module.exports = {
  urlbase,
  versionsUrl: `${urlbase}/versions/`,
  endpointsUrl: `${urlbase}/ocpi/2.2/`,
  credentialsUrl: `${urlbase}/ocpi/2.2/credentials/`,
  knownToken: {headers: {Authorization: 'Token AAA_AAA_AAA'}},
};
