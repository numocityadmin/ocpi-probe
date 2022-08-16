const { default: axios } = require('axios');
const {fetchToken}=require('./tokens');
const toDate=process.argv[3];
const fromDate=process.argv[2];

async function getCdrs(){
    const tokenRecord = await fetchToken('tokenCWithEndpoints');
    if(toDate && fromDate){
    const url = `${tokenRecord.cdrsEndpoints.url}${fromDate}/${toDate}`;
    console.log(`fetching cdrs at ${url}`);
    const cdrs=await axios.get(url,
        {headers: {Authorization: `Token ${tokenRecord.token}`}}
    ).catch((error)=>{
        console.log("error :",error);
    })
    console.log(`cdr-fetch-response:\n${cdrs.data.data}`);
}else{
    console.log('Provide toDate and fromDate');
}
}

getCdrs();