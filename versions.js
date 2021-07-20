
const supportedEndpoints = (host)=> ({
  version: '2.2',
  endpoints: [
    {
      identifier: 'credentials',
      role: 'RECEIVER',
      url: `${host}/ocpi/2.2/credentials/`,
    },
  ],
});

function addRoutes(app) {
  app.get('/versions', (req, res)=> {
    res.send(JSON.stringify(
        supportedEndpoints(`${req.protocol}://${req.get('host')}`),
    ));
  });
}

module.exports = {addRoutes};
