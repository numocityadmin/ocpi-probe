const { default: axios } = require('axios');
const {fetchToken}=require('./tokens');

async function getCdrs(toDate,fromDate){
    const tokenRecord = await fetchToken('tokenCWithEndpoints');
    const url = tokenRecord.commandsEndpoint.url;
    console.log(`fetching cdrs at ${url}`);
    const cdrs=await axios.get(url,
        {params:{
            toDate,
            fromDate,
        }},
        {headers: {Authorization: `Token ${tokenRecord.token}`}}
    ).catch((error)=>{
        console.log("error :",error);
    })
    console.log(`cdr-fetch-response:\n${JSON.stringify(cdrs.data.data)}`);
}

getCdrs(toDate,fromDate);