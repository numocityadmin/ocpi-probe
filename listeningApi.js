const express = require('express');
const bodyParser= require('body-parser');

const port = 6000;
if (process.env.OCPI_PROBE_BASEURL == null) {
  process.env.OCPI_PROBE_BASEURL = `http://localhost:${port}`;
  console.log(`set self url to ${process.env.OCPI_PROBE_BASEURL}`);
}
const app= express();
app.listen(port);
app.use(bodyParser.json());

app.post(`/emsp/sessions`, 
async function(req, res) {
  console.log(`session progress:\n${JSON.stringify(req.body)}`);
  res.end(JSON.stringify({status_code: 1000, data: {result: 'ACCEPTED'}}));
});

