const fetch = require('node-fetch');
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

// Status code according to https://github.com/ocpi/ocpi/blob/master/status_codes.asciidoc#status_codes_3xxx_server_errors
it('returns 3001 when credentials POSTed without GET on EMSP-versions URL',
    ()=> {
      const headersPart = knownToken;
      headersPart.headers['Content-Type'] = 'application/json';
      return fetch(credentialsUrl, {
        method: 'post',
        body: JSON.stringify(credentialsFromEMSP),
        ...knownToken,
      }).then((res)=> {
        expect(res.status).equals(500);
        return res.json();
      }).then((bodyInJson)=> {
        expect(bodyInJson.status_code).equals(3001);
        expect(bodyInJson.status_message).is.not.undefined;
      });
    });
