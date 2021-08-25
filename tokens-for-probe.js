
module.exports = {
  knownToken: 'AAA_AAA_AAA',
  outgoingToken: 'BBB_BBB_BBB',
  incomingToken: 'CCC_CCC_CCC',
  tokenHeader: (token)=> ({headers: {Authorization: `Token ${token}`}}),
};
