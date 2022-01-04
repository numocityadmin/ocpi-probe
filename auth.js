const {fetchToken}=require('./tokens');

async function checkAuth(authorization) {
  const tokenB=authorization.split(' ');
  const tokenRecord=await fetchToken('tokenCWithEndpoints');
  if (tokenRecord.token==tokenB[1]) {
    return true;
  } else {
    return false;
  }
}

module.exports={
  checkAuth,
};

