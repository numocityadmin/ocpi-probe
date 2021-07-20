
function authRequired(req) {
  // All paths except the root require authorization.
  // This is to enable one GET to always succeed for trouble-shooting.
  return req.originalUrl != '/';
}

function reqIsAuthorized(req, res, next) {
  if (authRequired(req) && !req.headers.authorization) {
    return res.status(401).json({error: 'No credentials sent!'});
  }
  next();
}

module.exports = {reqIsAuthorized};
