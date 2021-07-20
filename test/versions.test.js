const {expect} = require('chai');
const fetch = require('node-fetch');
const {cpoPort} = require('./server-starter');

const urlbase = `http://localhost:${cpoPort}`;
const versionsUrl = `${urlbase}/versions`;

it('reports version + endpoints', ()=> {
  const knownToken = {headers: {'Authorization': 'Token AAA_AAA_AAA'}};
  return fetch(versionsUrl, knownToken).then((res)=> {
    expect(res.status).equals(200);
    return res.json();
  }).then((bodyInJson)=> {
    expect(bodyInJson.version).equals('2.2');
    const credEndpoint = bodyInJson.endpoints[0];
    expect(credEndpoint.identifier).equals('credentials');
    expect(credEndpoint.url).includes(urlbase);
  });
});

// status as per https://github.com/ocpi/ocpi/blob/master/transport_and_format.asciidoc
const statusIsUnauthorized = (res)=> expect(res.status).equals(401);

it('responds 401-Unauthorized when invoked without a header', ()=> {
  return fetch(versionsUrl).then(statusIsUnauthorized);
});

it('responds 401-Unauthorized when token is missing from header', ()=> {
  const missingToken = {headers: {'Authorization': 'something'}};
  return fetch(versionsUrl, missingToken).then(statusIsUnauthorized);
});

it('responds 401-Unauthorized when token in header is unknown', ()=> {
  const unknownToken = {headers: {'Authorization': 'Token non-existent'}};
  return fetch(versionsUrl, unknownToken).then(statusIsUnauthorized);
});
