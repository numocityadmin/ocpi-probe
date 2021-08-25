const fetch = require('node-fetch');

async function patchStatus(patchUrl, status) {
  console.log(`patching ${status} to ${patchUrl}`);
  const res = await fetch(patchUrl, {
    method: 'patch',
    body: {status, last_updated: new Date().toJSON()},
  });
  console.log(`patch status received: ${res.status}`);
}

module.exports = {patchStatus};
