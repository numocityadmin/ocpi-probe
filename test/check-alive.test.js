const fetch = require('node-fetch');
const {expect} = require('chai');
const {cpoPort} = require('./server-starter');

it('check-alive: reports version on GET, even without authorization', ()=> {
  const receiverURL = `http://localhost:${cpoPort}`;
  return fetch(receiverURL).then((res)=> res.json()).then((bodyInJson)=> {
    expect(bodyInJson.version).is.not.undefined;
  });
});
