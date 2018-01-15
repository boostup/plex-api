# Plex API

## HTTP API Unofficial Doc

https://github.com/Arcanemagus/plex-api/wiki

## plex-api package
- https://www.npmjs.com/package/plex-api
- https://github.com/phillipj/node-plex-api

## Using this package
npm i @boostup/plex-api
const plexApi = require('@boostup/plex-api');

plexApi.setConfig({
    hostname: "<internal ip address of your server running on LAN>",
    username: "<plex username>",
    password: "<plex password>" 
});

## Developing | Contributions to this package
Just check the available commands in the `scripts` section of the `package.json` file