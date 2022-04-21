# OCPI probe

This utility sends and listens to OCPI requests as a CPO.
It verifies responses and reports the results.

## Setup

Install and use node v14 or higher. Use nvm to manage node installations.
Install using https://github.com/nvm-sh/nvm#install--update-script

Install NPM dependencies

```bash
npm install
```

## Run as a CPO server

Run the server locally to listen on port 9033 (or any other free port on your system)

```bash
node start.js -p 9033
```

### Check

Navigate to http://localhost:9033 on your browser.

If you see a response with the version, then the server has started successfully.

### OCPI Modules & Limitations

This probe supports OCPI modules in test mode. Calls are made as idempotent as possible, which means it deviates from OCPI in some places. Details are below.

**Registration and Authentication**

The following modules can be used with a one-time token (Token A). According to OCPI, repeat-use of Token A is not allowed.
However, for testing, you can use the same token any number of times with this server.

- [Versions and Endpoints](https://github.com/ocpi/ocpi/blob/master/version_information_endpoint.asciidoc)
- [Credentials](https://github.com/ocpi/ocpi/blob/master/credentials.asciidoc)

For registration (Token A), use initial token: `AAA_AAA_AAA`

This server will always use token B `BBB_BBB_BBB` while making subsequent requests to the eMSP.
**Limitation**: The token posted by the eMSP is not persisted. To interact with this server, the eMSP needs to accept both tokens: The one it posted in the credentials module and `BBB_BBB_BBB`.

For subsequent requests to this server, use token C: `CCC_CCC_CCC`.
This is the token returned in the Credentials response. 

## Run as a CPO client

In this mode, the probe will post / patch data to the eMSP.
Currently, it can only patch the status of EVSE.

View available options

```bash
node start.js --help
```

Trigger the status-patch towards the eMSP

```bash
node start.js -v <eMSP versions endpoint URL> -s <status>
```

Example:

```bash
node start.js -v https://emsp.com/ocpi/2.2/versions -s AVAILABLE
```

## Emulate EMSP session

Set environment variable `MongoURI` as above and `ocppVersionsURL` to the OCPI CPO versions URL

```bash
node sampleEMSP.js
```

### Start a session

Set environment variable `MongoURI` as above

```bash
node startSession.js 
```
After it starts, kill with ^C

### Stop that session

In the same terminal

```bash
node stopSession.js
```
