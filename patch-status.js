const fetch = require('node-fetch');
const {outgoingToken} = require('./tokens-for-probe');

async function patchStatus(patchUrl, status) {
  console.log(`patching ${status} to ${patchUrl} with token ${outgoingToken}`);
  const res = await fetch(patchUrl, {
    method: 'patch',
    body: JSON.stringify({status, last_updated: new Date().toJSON()}),
    headers: {
      'Authorization': `Token ${outgoingToken}`,
      'Content-Type': 'application/json',
    },
  });
  console.log(`patch status response: ${res.status}`);
}

module.exports = {patchStatus};
