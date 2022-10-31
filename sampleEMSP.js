const axios = require('axios');
const express = require('express');
const bodyParser= require('body-parser');
const storage = require('@numocity-admin/schemaless-mongo');
const fs= require('fs');
// const {upsertSession} = require('./tokens');
const emspRecord = JSON.parse(fs.readFileSync('emsp.json'));
const {collectionName}=require('./tokens');

const port = 6000;
if (process.env.OCPI_PROBE_BASEURL == null) {
  process.env.OCPI_PROBE_BASEURL = `http://localhost:${port}`;
  console.log(`set self url to ${process.env.OCPI_PROBE_BASEURL}`);
}
const app= express();
const versionsURL=process.env.OCPI_PROBE_BASEURL.concat('/emsp/versions');
const endPointsURL=process.env.OCPI_PROBE_BASEURL.concat('/emsp/endpoints');
const locationsURL=process.env.OCPI_PROBE_BASEURL.concat('/emsp/locations');
const cdrsUrl=process.env.OCPI_PROBE_BASEURL.concat('/emsp/cdrs');
const tariffsUrl=process.env.OCPI_PROBE_BASEURL.concat('/emsp/tariffs');
const commandsURL=process.env.OCPI_PROBE_BASEURL
    .concat('/emsp/commands/');
const sessionsURL=process.env.OCPI_PROBE_BASEURL
    .concat('/emsp/sessions');
// const invalidAuth={
//   statusCode: 2001,
//   statusMessage: 'Invalid Auth Header',
// };
const tokenBforOCPI={
  token: 'tokenB',
  url: versionsURL,
  roles: [{
    role: 'EMSP',
    party_id: emspRecord.partyId,
    country_code: emspRecord.countryCode,
    business_details: {name: 'numorbml'},
  }],
};
app.listen(port);
app.use(bodyParser.json());
app.get('/emsp/versions', function(req, res) {
  res.send({
    data: [{version: '2.2',
      url: endPointsURL}],
    status_code: 1000,
    status_message: 'Success',
    timestamp: Date.now(),
  });
});
app.get('/emsp/endpoints', function(req, res) {
  res.send({
    data: {
      version: '2.2',
      endpoints: [{
        identifier: 'locations',
        role: 'SENDER',
        url: locationsURL,
      }, {
        identifier: 'commands',
        role: 'RECEIVER',
        url: commandsURL,
      }, {
        identifier: 'sessions',
        role: 'RECEIVER',
        url: sessionsURL,
      }, {
        identifier: 'cdrs',
        role: 'RECEIVER',
        url: cdrsUrl,
      },
      {
        identifier: 'tariffs',
        role: 'RECEIVER',
        url: tariffsUrl,
      },
      ]},
  });
});
app.post('/emsp/commands/START_SESSION',
// Todo : auth of token B
    async function(req, res) {
      console.log(`session start:\n${JSON.stringify(req.body)}`);
      const curSession = JSON.parse(fs.readFileSync('current-session.json'));
      curSession.sessionId = req.body.message.text;
      fs.writeFileSync('current-session.json', JSON.stringify(curSession));
      res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
    });

app.post('/emsp/commands/STOP_SESSION',
// Todo : auth of token B
    async function(request, res) {
      console.log(`session stop:\n${JSON.stringify(request.body)}`);
      res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
    });

app.put(`/emsp/sessions/${emspRecord.countryCode}/${emspRecord.partyId}/:sessionId`, 
async function(req, res) {
  // Todo : auth of token B
  console.log('sessionId: ', req.params.sessionId);
  console.log(`session progress:\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

app.patch(`/emsp/locations/${emspRecord.countryCode}/${emspRecord.partyId}/:stationId/:numotype/:evse`, 
async function(req, res) {
  console.log('evseId: ', req.params.evse);
  console.log(`patch body:\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

app.put(`/emsp/locations/${emspRecord.countryCode}/${emspRecord.partyId}/:stationId/:numotype/:evse`, 
async function(req, res) {
  console.log('evseId: ', req.params.evse);
  console.log(`patch body:\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

app.put(`/emsp/locations/${emspRecord.countryCode}/${emspRecord.partyId}/:stationId`, 
async function(req, res) {
  console.log('evseId: ', req.params.stationId);
  console.log(`patch body:\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

app.put('/emsp/tariffs', async function(req, res) {
  // Todo : auth of token B
  console.log(`Tariff Details:\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

app.post('/emsp/cdrs', async function(req, res) {
  console.log('cdrId: ', req.body.id);
  console.log(`cdr Object :\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

async function gettingVersions() {
  const versions=await axios.get(process.env.ocppVersionsURL,
      {headers: {Authorization: `Token ${emspRecord.token}`}});
  const compatibleVersions=versions.data.data.filter((x)=> x.version == '2.2');
  return compatibleVersions[0];
}

async function gettingEndPoints(versions) {
  if (versions) {
    const endpoints = await axios.get(versions.url,
        {headers: {Authorization: `Token ${emspRecord.token}`}}).catch((err)=>{
      console.log(err);
    });
    return endpoints.data.data.endpoints;
  } else {
    return 0;
  }
}

async function postTokenB(credentials) {
  console.log(credentials.url);
  await axios.post(credentials.url, tokenBforOCPI,
      {headers: {Authorization: `Token ${emspRecord.token}`}},
  )
      .then(async (res)=>{
        this.tokenC=res.data.data.token;
      })
      .catch((err)=>{
        console.log(err);
      });
}

async function storetheResult(commands, sessions, tokenC, cdrs, tariffs) {
  const result={
    identifier: 'tokenCWithEndpoints',
    commandsEndpoint: commands,
    sessionsEndpoints: sessions,
    cdrsEndpoints: cdrs,
    tariffEndpoints: tariffs,
    token: tokenC,
  };
  await storage.connect();
  await storage.upsert({collectionName, parameters: result});
  await storage.upsert({collectionName, parameters: {
    identifier: 'TokenB',
    token: tokenBforOCPI.token,
  }});
}


async function credentialsHandShake() {
  const versions=await gettingVersions();
  const endPoints=await gettingEndPoints(versions);
  const credentialsEndpoints=endPoints.filter((x)=>x.identifier=='credentials');
  const commandsEndpoints=endPoints.filter((x)=>x.identifier=='commands');
  const sessionsEndpoints=endPoints.filter((x)=>x.identifier=='sessions');
  const cdrsEndpoints=endPoints.filter((x)=>x.identifier=='cdrs');
  const tariffEndpoints=endPoints.filter((x)=>x.identifier=='tariffs');
  if (credentialsEndpoints) {
    await postTokenB(credentialsEndpoints[0]);
  }
  console.log(this.tokenC);
  await storetheResult(commandsEndpoints[0], sessionsEndpoints[0],
      this.tokenC, cdrsEndpoints[0], tariffEndpoints[0]);
  return commandsEndpoints[0];
}

async function completeProcess() {
  console.log(process.env.OCPI_PROBE_BASEURL);
  await credentialsHandShake();
}

completeProcess();
