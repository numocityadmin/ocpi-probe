const express = require('express');
const {reqIsAuthorized} = require('./authCheck');

function startServer(port) {
  const app = express();
  app.use(express.json());
  app.use(reqIsAuthorized);
  app.get('/', (_, res)=> {
    res.send(`{
    "utility": "cpo interface",
    "version": "${require('./package.json').version}"
  }`);
  });
  require('./versions').addRoutes(app);
  require('./credentials').addRoutes(app);
  app.listen(port, ()=> console.log(`started listening on port ${port}`));
}

module.exports = {startServer};
