const { fetchToken } = require("./tokens");
const axios = require('axios');
const fs= require('fs');

async function stopSession(){
    const emspRecord = JSON.parse(fs.readFileSync('emsp.json'));
    console.log(emspRecord);
    const sessionRecord= await fetchToken('SessionID');
    const record = await fetchToken('tokenCWithEndpoints');
    const url = record.commandsEndpoint.url.concat('STOP_SESSION');
    console.log(url);
    await axios.post(url,
        {
            response_url: emspRecord.stopSessionURL,
            session_id: sessionRecord.sessionId,
        },
        {headers: {Authorization: `Token ${record.token}`}}
        )
        .catch(err=>{console.log(err);})
}

stopSession()