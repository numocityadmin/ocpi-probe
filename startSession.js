const {fetchToken}=require('./tokens');
const fs= require('fs');
const axios= require('axios');


async function startSession() {
  const emsprecord = JSON.parse(fs.readFileSync('emsp.json'));
  const tokenRecord = await fetchToken('tokenCWithEndpoints');
  const url = new URL(tokenRecord.commandsEndpoint.url);
  const startSessionUrl=`${url.origin}${url.pathname}START_SESSION${url.search}`;
  fs.writeFileSync('current-session.json',
      JSON.stringify({commandsEndpoint: tokenRecord.commandsEndpoint.url}));

  console.log(`starting a session at ${startSessionUrl}`);
  const resURL=process.env.OCPI_PROBE_BASEURL
      .concat('/emsp/commands/START_SESSION');
  const startResponse = await axios.post(startSessionUrl,
      {
        response_url: resURL,
        location_id: 1234,
        token: emsprecord.idTag,
        evse_uid: emsprecord.evseWithConnectorId,
      },
      {headers: {Authorization: `Token ${tokenRecord.token}`}},
  ).catch((err)=>{
    console.log('error'+err);
  });
  console.log(`start-response:\n${JSON.stringify(startResponse.data)}`);
}

startSession();


