const {hostFromReq} = require('./hostfromreq');

const supportedVersions = (host)=> [{
  version: '2.2',
  url: `${host}/ocpi/2.2/`,
}];

const supportedEndpoints = (host)=> ({
  version: '2.2',
  endpoints: [
    {
      identifier: 'credentials',
      role: 'RECEIVER',
      url: `${host}/ocpi/2.2/credentials/`,
    }, {
      identifier: 'locations',
      role: 'SENDER',
      url: `${host}/ocpi/2.2/locations/`,
    },
  ],
});

function addRoutes(app) {
  const supportedInfoSender = (supportedContent)=> (req, res)=> {
    res.json(supportedContent(hostFromReq(req)));
  };
  app.get('/versions', supportedInfoSender(supportedVersions));
  app.get('/ocpi/2.2', supportedInfoSender(supportedEndpoints));
}

module.exports = {addRoutes};
