const fetch = require('node-fetch');
const {hostFromReq} = require('./hostfromreq');

const credentialsResponse = (host)=> ({
  'token': 'CCC_CCC_CCC',
  'url': `${host}/versions`,
  'roles': [{
    'role': 'CPO',
    'party_id': 'NUMO001T',
    'country_code': 'IN',
    'business_details': {
      'name': 'Numocity-OCPI-tester',
    },
  }],
});

async function isCompatible2dot2(credentials) {
  console.log(`getting versions from emsp ${credentials.url}`);
  const res = await fetch(credentials.url,
      {headers: {Authorization: `Token ${credentials.token}`}});
  const bodyInJson = await(res.json());
  const compatibleVersions = bodyInJson.filter((x)=> x.version == '2.2');
  return compatibleVersions.length >= 1;
}

function addRoutes(app) {
  app.post('/ocpi/2.2/credentials', async (req, res)=> {
    console.dir(req.body);
    if (await isCompatible2dot2(req.body)) {
      res.status(200).send(credentialsResponse(hostFromReq(req)));
    } else {
      res.status(500).send({
        status_code: 3001,
        status_message:
          `unable to contact versions endpoint ${req.body.url} on eMSP`,
      });
    }
  });
}

module.exports = {addRoutes};
