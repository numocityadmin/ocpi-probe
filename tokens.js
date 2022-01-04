const storage = require('@numocity-admin/schemaless-mongo');
const collectionName= 'emsp_ocpi_tokens';

async function fetchToken(token) {
  await storage.connect();
  return await storage.recallOne({collectionName, identifier: token});
}

// async function upsertSession(body) {
//   await storage.connect();
//   await storage.upsert(
//       {collectionName,
//         parameters: {
//           identifier: 'SessionObject',
//           body,
//         }});
// }

module.exports={
  collectionName,
  fetchToken,
  // upsertSession,
};
