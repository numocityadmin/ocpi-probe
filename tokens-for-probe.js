
module.exports = {
  knownToken: 'AAA_AAA_AAA',
  incomingToken: 'BBB_BBB_BBB',
  outgoingToken: 'CCC_CCC_CCC',
  tokenHeader: (token)=> ({headers: {Authorization: `Token ${token}`}}),
};
