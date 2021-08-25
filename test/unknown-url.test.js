const {expect} = require('chai');
const fetch = require('node-fetch');
const {urlbase} = require('./endpoints-token');

it('fails on unknown url without Authorization header', ()=> {
  return fetch(`${urlbase}/not-valid`).then((r)=> {
    expect(r.status).not.equals(200);
  });
});
