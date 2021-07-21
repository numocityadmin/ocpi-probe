const {expect} = require('chai');
const fetch = require('node-fetch');

const {versionsUrl, endpointsUrl, credentialsUrl, knownToken} =
  require('./endpoints-token');

const resIsOkJson = (res)=> {
  expect(res.status).equals(200);
  return res.json();
};

it('reports supported versions on GET of /versions', ()=> {
  return fetch(versionsUrl, knownToken).then(resIsOkJson).then((bodyInJson)=> {
    expect(bodyInJson[0].version).equals('2.2');
    expect(bodyInJson[0].url).equals(endpointsUrl);
  });
});

it('reports endpoints on GET of /ocpi/2.2', ()=> {
  return fetch(endpointsUrl, knownToken).then(resIsOkJson).then((bodyInJson)=> {
    expect(bodyInJson.version).is.not.undefined;
    const credEndpoint = bodyInJson.endpoints[0];
    expect(credEndpoint.identifier).equals('credentials');
    expect(credEndpoint.url).equals(credentialsUrl);
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
