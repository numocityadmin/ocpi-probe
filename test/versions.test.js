const {expect} = require('chai');
const fetch = require('node-fetch');
const {cpoPort} = require('./server-starter');
const urlbase = `http://localhost:${cpoPort}`;

it('reports version + endpoints', ()=> {
  return fetch(`${urlbase}/versions`, {
    headers: {'Authorization': 'something'},
  }).then((res)=> {
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
it('responds 401-Unauthorized when invoked without a token', ()=> {
  return fetch(`${urlbase}/versions`).then((res)=>
    expect(res.status).equals(401));
});
