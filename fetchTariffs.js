const {default: axios} = require('axios');
const {fetchToken}=require('./tokens');
const tariffId=process.argv[2];

async function getTariffs() {
  const tokenRecord = await fetchToken('tokenCWithEndpoints');
  let url;
  if (tariffId) {
    url = `${tokenRecord.tariffEndpoints.url}IN/NMC/${tariffId}`;
  } else {
    url=`${tokenRecord.tariffEndpoints.url}`;
  }
  console.log(`fetching cdrs at ${url}`);
  const tariffs=await axios.get(url,
      {headers: {Authorization: `Token ${tokenRecord.token}`}},
  ).catch((error)=>{
    console.log('error :', error);
  });
  console.log(`tariff-fetch-response:\n${JSON.stringify(tariffs.data.data)}`);
}

getTariffs();
