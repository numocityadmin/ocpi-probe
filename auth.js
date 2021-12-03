const {fetchToken}=require('./tokens');

async function checkAuth(authorization){
    tokenB=authorization.split(' ');
    const tokenRecord=await fetchToken('TokenB');
    if(tokenRecord.token==tokenB[1]){
        return true;
    }else{
        return false;
    }    
}

module.exports={
    checkAuth,
}

