const {fetchToken}=require('./tokens');
const fs= require('fs');
const axios= require('axios');


async function startSession() {
  const emsprecord = JSON.parse(fs.readFileSync('emsp.json'));
  const tokenRecord = await fetchToken('tokenCWithEndpoints');
  const url = tokenRecord.commandsEndpoint.url.concat('START_SESSION');
  console.log(url);
  const resURL=process.env.OCPI_PROBE_BASEURL
      .concat('/emsp/commands/START_SESSION');
  await axios.post(url,
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
}

startSession();


