# OCPI probe

This utility sends and listens to OCPI requests.
It verifies responses and reports the results.

## Setup

Install and use node v14 or higher. Use nvm to manage node installations.
Install using https://github.com/nvm-sh/nvm#install--update-script

Install NPM dependencies

```bash
npm install
```

## Run

Run the server locally to listen on port 9033 (or any other free port on your system)

```bash
node start.js -p 9033
```

## Check

Navigate to http://localhost:9033 on your browser.

If you see a response with the version, then the server has started successfully.

## OCPI Modules

This probe supports OCPI modules in test mode. Calls are made as idempotent as possible, which means it deviates from OCPI in some places. Details are below.

**Registration and Authentication**

The following modules can be used with a one-time token (Token A). According to OCPI, repeat-use of Token A is not allowed.
However, for testing, you can use the same token any number of times with this server.

- [Versions and Endpoints](https://github.com/ocpi/ocpi/blob/master/version_information_endpoint.asciidoc)
- [Credentials](https://github.com/ocpi/ocpi/blob/master/credentials.asciidoc)

For registration (Token A), use token: AAA_AAA_AAA

Token B (POSTed on credentials) is not persisted by this server.
