const {expect} = require('chai');
const fetch = require('node-fetch');
const {locationsUrl, incomingToken} = require('./endpoints-token');

it('returns locations on GET', ()=> {
  return fetch(locationsUrl, incomingToken).then((r)=> {
    expect(r.status).equals(200);
    return r.json();
  }).then((bodyInJson)=> {
    expect(bodyInJson.evses[0].status).is.not.undefined;
  });
});
