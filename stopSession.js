const {fetchToken} = require('./tokens');
const axios = require('axios');
const fs= require('fs');

async function stopSession() {
  const emspRecord = JSON.parse(fs.readFileSync('emsp.json'));
  console.log(emspRecord);
  const curSession = JSON.parse(fs.readFileSync('current-session.json'));
  const url = new URL(curSession.commandsEndpoint);
  const stopSessionUrl=`${url.origin}${url.pathname}/STOP_SESSION${url.search}`;
  console.log(`stopping session ${curSession.sessionId} on ${stopSessionUrl}`);

  const record = await fetchToken('tokenCWithEndpoints');
  const resURL=process.env.OCPI_PROBE_BASEURL
      .concat('/emsp/commands/STOP_SESSION');
  await axios.post(stopSessionUrl,
      {
        response_url: resURL,
        session_id: curSession.sessionId,
      },
      {headers: {Authorization: `Token ${record.token}`}},
  )
      .catch((err)=>{
        console.log(err);
      });
}

stopSession();
