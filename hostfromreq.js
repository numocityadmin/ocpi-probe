
const hostFromReq = (req)=> `${req.protocol}://${req.get('host')}`;

module.exports = {hostFromReq};
