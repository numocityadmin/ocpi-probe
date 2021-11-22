const {fetchToken}=require('./tokens');
const axios= require('axios');
const fs= require('fs');

async function startSession(){
    const emspRecord = JSON.parse(fs.readFileSync('emsp.json'));
    const record = await fetchToken('tokenCWithEndpoints');
    const url = record.commandsEndpoint.url.concat('START_SESSION');
    console.log(url);
    await axios.post(url,
        {
            response_url: emspRecord.startSessionURL,
            location_id: 1234,
            token: emspRecord.idTag,
            evse_uid: emspRecord.evseWithConnectorId,
        },
        {headers: {Authorization: `Token ${record.token}`}}
        ).catch(err=>{console.log(err);})
}

startSession();



