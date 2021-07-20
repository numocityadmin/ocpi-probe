
const knownTokens = ['AAA_AAA_AAA'];

function authRequired(req) {
  // All paths except the root require authorization.
  // This is to enable one GET to always succeed for trouble-shooting.
  return req.originalUrl != '/';
}

function tokenIn(headers) {
  let token;
  const splitBySpace = (s)=> s.split(/(\s+)/).filter((e)=> e.trim().length > 0);
  const authParts = splitBySpace(headers.authorization);
  if (authParts.length == 2 && authParts[0].toLowerCase() == 'token') {
    token = authParts[1];
  }
  return token;
}

function tokenIsAuthorized(headers) {
  return headers.authorization && knownTokens.includes(tokenIn(headers));
}

function reqIsAuthorized(req, res, next) {
  if (authRequired(req) && !tokenIsAuthorized(req.headers)) {
    return res.status(401).json({error: 'No credentials sent!'});
  }
  next();
}

module.exports = {reqIsAuthorized, tokenIsAuthorized};
