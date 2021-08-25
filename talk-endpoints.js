const {fetchEndpoint} = require('./fetch-endpoint');
const {patchStatus} = require('./patch-status');

const urlWithTrailingSlash = (url)=> url.endsWith('/') ? url: url + '/';
const cmdlineGoodForStatus = (cmdline)=>
  cmdline.status && cmdline.location && cmdline.evse;

async function talkToEndpoints(parsedCmdline) {
  const versionsUrl = parsedCmdline.versions;
  if (versionsUrl && cmdlineGoodForStatus(parsedCmdline)) {
    const locationsReceiverUrl =
      urlWithTrailingSlash(await fetchEndpoint({
        moduleName: 'locations',
        role: 'RECEIVER',
        versionsUrl,
      }));
    const {location, evse} = parsedCmdline;
    const statusPatchUrl = `${locationsReceiverUrl}IN/NMC/${location}/${evse}`;
    await patchStatus(statusPatchUrl, parsedCmdline.status);
    return true;
  }
}

module.exports = {talkToEndpoints};
