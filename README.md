# OCPI probe

This utility sends and listens to OCPI requests.
It verifies responses and reports the results.

It supports the following modules:

1. [Versions and Endpoints](https://github.com/ocpi/ocpi/blob/master/version_information_endpoint.asciidoc)
2. [Credentials](https://github.com/ocpi/ocpi/blob/master/credentials.asciidoc)

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
