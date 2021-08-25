const fetch = require('node-fetch');
const {outgoingToken, tokenHeader} = require('./tokens-for-probe');

async function fetchJsonBody(url) {
  console.log(`GETting from ${url} with token ${outgoingToken}`);
  const res = await fetch(url, tokenHeader(outgoingToken));
  if (res.status != 200) throw Error(JSON.stringify(res));
  const jsonBody = await res.json();
  console.log(`Got ${JSON.stringify(jsonBody, null, 2)}`);
  return jsonBody;
}

async function fetchEndpoint({moduleName, role, versionsUrl}) {
  const versions = await fetchJsonBody(versionsUrl);
  const endpointsUrl = versions.filter((x)=> x.version == '2.2')[0].url;
  const endpoints = await fetchJsonBody(endpointsUrl);
  const moduleUrl =
    endpoints.filter((x)=> x.identifier == moduleName && x.role == role);
  if (moduleUrl.length != 1) {
    throw Error(`expected one module ${moduleName} with role ${role}`);
  }
  return moduleUrl[0].url;
}

module.exports = {fetchEndpoint};
