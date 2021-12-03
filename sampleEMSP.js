const axios = require('axios');
const express = require('express');
const bodyParser= require('body-parser');
const storage = require('@numocity-admin/schemaless-mongo');
const collectionName= 'emsp_ocpi_tokens';
const fs= require('fs');
const { upsertSession } = require('./tokens');
const { checkAuth } = require('./auth');
const emspRecord = JSON.parse(fs.readFileSync('emsp.json'));

const port = 8000;
const app= express();
const tokenBforOCPI={
    token: 'tokenBfromEMSP',
    url: `http://localhost:8000/emsp/versions/`,
    roles: [{
      role: 'EMSP',
      party_id: 'EMSP01',
      country_code: 'IN',
      business_details: {name: 'EMSP name'},
    }],
  }
app.listen(port);
app.use(bodyParser.json());
app.get(emspRecord.emspVersionsPath,function(req,res){
    res.send([{
    version:'2.2',
    url:'http://localhost:8000/emsp/endpoints'
}])
})
app.get(emspRecord.emspEndPointsPath,function(req,res){
    res.send({
    versions:'2.2',
    endPoints:[{
        identifier: 'locations',
        role: 'SENDER',
        url:'http://localhost:8000/emsp/locations',
      }, {
        identifier: 'commands',
        role: 'RECEIVER',
        url: 'http://localhost:8000/emsp/ocpi/2.2/commands/',
      }, {
        identifier: 'sessions',
        role: 'RECEIVER',
        url: 'http://localhost:8000/emsp/ocpi/2.2/sessions',
      },
      ]
})
})
app.post('/emsp/ocpi/2.2/commands/START_SESSION/1234',async function(req,res){
    const auth=await checkAuth(req.headers.authorization);
    console.log(req.body);
    console.log(auth);
    if(auth){
        console.log(req.body.result);
        await storeSessionId(req.body.sessionId);
    }else{
        res.send({
            statusCode:2001,
            statusMessage:'Invalid Auth Header'
        })
    }
})

app.post('/emsp/ocpi/2.2/commands/STOP_SESSION/1234',async function(req,res){
    const auth=await checkAuth(req.headers.authorization);
    console.log(req.headers.authorization);
    console.log(auth);
    if(auth){
        console.log(req.body.result);
    }else{
        res.send({
            statusCode:2001,
            statusMessage:'Invalid Auth Header'
        })
    }
})

app.put('/emsp/ocpi/2.2/sessions',async function(req,res){
    console.log(req.headers.authorization);
    const auth=await checkAuth(req.headers.authorization);
    if(auth){
    console.log(req.body);
    upsertSession(req.body);
    res.send('session updated');
    }else{
    res.send({
        statusCode:2001,
        statusMessage:'Invalid Auth Header'
    })
}
})

async function gettingVersions(){
    const versions=await axios.get('http://localhost:7904/api/versions',
    {headers: {Authorization: `Token AAA_AAA_AAA`}});
    const compatibleVersions=versions.data.filter((x)=> x.version == '2.2');
    return compatibleVersions[0];
}

async function gettingEndPoints(versions){
    if(versions){
    const endpoints = await axios.get(versions.url,
    {headers: {Authorization: `Token AAA_AAA_AAA`}})
    return endpoints.data.endpoints;
    }
    else{ 
        return 0;
    }
}

async function postTokenB(credentials){
    console.log(credentials.url);
    await axios.post(credentials.url,tokenBforOCPI,
          {headers: {Authorization: 'Token AAA_AAA_AAA'}},
         )
        .then(async (res)=>{
            this.tokenC=res.data.token;
        })
        .catch((err)=>{console.log(err);})
}

async function storetheResult(commands,sessions,tokenC){
    const result={
        identifier: 'tokenCWithEndpoints',
        commandsEndpoint: commands,
        sessionsEndpoints: sessions,
        token: tokenC
    }
    await storage.connect();
    await storage.upsert({collectionName, parameters: result});
    await storage.upsert({collectionName,parameters:{
        identifier:'TokenB',
        token:tokenBforOCPI.token,
    }})
}


async function credentialsHandShake(){
    const versions=await gettingVersions();
    const endPoints=await gettingEndPoints(versions);
    const credentialsEndpoints=endPoints.filter((x)=>x.identifier=='credentials');
    const commandsEndpoints=endPoints.filter((x)=>x.identifier=='commands');
    const sessionsEndpoints=endPoints.filter((x)=>x.identifier=='sessions');
    if(credentialsEndpoints && commandsEndpoints && sessionsEndpoints){
    await postTokenB(credentialsEndpoints[0]);
    }
    console.log(this.tokenC);
    await storetheResult(commandsEndpoints[0],sessionsEndpoints[0],this.tokenC)
    return commandsEndpoints[0];
}

async function storeSessionId(id){
    const sessionID={
        identifier:'SessionID',
        sessionId: id,
        }
        await storage.connect();
        await storage.upsert({collectionName, parameters: sessionID });
}

async function completeProcess(){
 const commandsEndpoint=await credentialsHandShake();
}

completeProcess();
