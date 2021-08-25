const {knownToken, incomingToken} = require('./tokens-for-probe');

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

function tokenIsAuthorized(req) {
  const headers = req.headers;
  const req2token = [
    {pattern: /versions/, tokens: [knownToken]},
    {pattern: /credentials/, tokens: [knownToken]},
    {pattern: /locations/, tokens: [incomingToken]},
    {pattern: /ocpi\/2\.2[/]?$/, tokens: [knownToken]},
  ];
  console.log(`  authorizing ${req.originalUrl}
    with header ${JSON.stringify(headers)}`);
  const matchedPat = req2token.filter((x)=> req.originalUrl.match(x.pattern));
  if (matchedPat.length > 0) {
    console.log(`expecting authorization token 
      ${JSON.stringify(matchedPat[0].tokens)}`);
    return headers.authorization &&
      matchedPat[0].tokens.includes(tokenIn(headers));
  } else {
    console.log(`unrecognized url targeted: ${req.originalUrl}`);
    return false;
  }
}

function reqIsAuthorized(req, res, next) {
  if (authRequired(req) && !tokenIsAuthorized(req)) {
    return res.status(401).json({error: 'No credentials sent!'});
  }
  next();
}

module.exports = {reqIsAuthorized, tokenIsAuthorized};
