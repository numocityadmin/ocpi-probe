const {fetchToken}=require('./tokens');
const storage = require('@numocity-admin/schemaless-mongo');
const {collectionName}=require('./tokens');

async function checkAuth(authorization) {
  await storage.connect();
  await storage.upsert({collectionName, parameters: {
    identifier: 'TokenB',
    token: 'tokenBfromEMSP',
  }});
  const tokenB=authorization.split(' ');
  const tokenRecord=await fetchToken('TokenB');
  console.log('tokenRecord :'+tokenRecord);
  if (tokenRecord.token==tokenB[1]) {
    return true;
  } else {
    return false;
  }
}

module.exports={
  checkAuth,
};

