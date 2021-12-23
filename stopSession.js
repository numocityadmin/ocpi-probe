const {fetchToken} = require('./tokens');
const axios = require('axios');
const fs= require('fs');

async function stopSession() {
  const emspRecord = JSON.parse(fs.readFileSync('emsp.json'));
  console.log(emspRecord);
  const sessionRecord= await fetchToken('SessionID');
  console.log(sessionRecord);
  const record = await fetchToken('tokenCWithEndpoints');
  const url = record.commandsEndpoint.url.concat('STOP_SESSION');
  const resURL=process.env.OCPI_PROBE_BASEURL
      .concat('/emsp/commands/STOP_SESSION');
  await axios.post(url,
      {
        response_url: resURL,
        session_id: sessionRecord.sessionId,
      },
      {headers: {Authorization: `Token ${record.token}`}},
  )
      .catch((err)=>{
        console.log(err);
      });
}

stopSession();
