const fetch = require('node-fetch');
const nock = require('nock');
const {expect} = require('chai');
const {credentialsUrl, knownToken} = require('./endpoints-token');

const emspVersionsUrl = `http://example-emsp.com/ocpi/versions/`;

const credentialsFromEMSP = ({
  token: 'BBB_BBB_BBB',
  url: emspVersionsUrl,
  roles: [{
    role: 'EMSP',
    party_id: 'EMSP01',
    country_code: 'IN',
    business_details: {name: 'EMSP name'},
  }],
});

function checkCredentials({expectedHTTPstatus, expectedOCPIstatus}) {
  const headersPart = knownToken;
  headersPart.headers['Content-Type'] = 'application/json';
  return fetch(credentialsUrl, {
    method: 'post',
    body: JSON.stringify(credentialsFromEMSP),
    ...headersPart,
  }).then((res)=> {
    expect(res.status).equals(expectedHTTPstatus);
    return res.json();
  }).then((bodyInJson)=> {
    expect(bodyInJson.status_code).equals(expectedOCPIstatus);
    expect(bodyInJson.status_message).is.not.undefined;
    return bodyInJson;
  });
}

// OCPI Status code according to https://github.com/ocpi/ocpi/blob/master/status_codes.asciidoc#status_codes_3xxx_server_errors
// We use HTTP 500- not 200/201, which would mean the registration is created.
it('returns 3001 when credentials POSTed and sender-versions URL is invalid',
    ()=> {
      return checkCredentials({
        expectedHTTPstatus: 400,
        expectedOCPIstatus: 3001,
      });
    });

it('returns 3001 on bad response from EMSP versions endpoint', ()=> {
  nock('http://example-emsp.com').get('/ocpi/versions/')
      .reply(200, {some: 'thing'});
  return checkCredentials({
    expectedHTTPstatus: 400,
    expectedOCPIstatus: 3001,
  });
});

it('returns 1000 with Token C, when credentials POSTed and Sender responds',
    ()=> {
      nock('http://example-emsp.com').get('/ocpi/versions/')
          .reply(200, [{
            version: '2.2',
            url: `http://example-emsp.com/ocpi/2.2/`,
          }]);
      return checkCredentials({
        expectedHTTPstatus: 200,
        expectedOCPIstatus: 1000,
      }).then((bodyInJson)=> expect(bodyInJson.token).is.not.undefined);
    });
