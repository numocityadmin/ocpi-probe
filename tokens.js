const storage = require('@numocity-admin/schemaless-mongo');
const collectionName= 'emsp_ocpi_tokens';

async function fetchToken(token){
    await storage.connect();
    return await storage.recallOne({collectionName, identifier: token});
}

module.exports={
    collectionName,
    fetchToken,
}