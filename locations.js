const ccs2connector = {
  id: '1',
  standard: 'IEC_62196_T2_COMBO',
  format: 'CABLE',
  power_type: 'DC',
  max_voltage: 80,
  max_amperage: 16,
};

const locations = {
  country_code: 'IN',
  party_id: 'NMC',
  id: '/numotry/numo-ocpi/LOC0001',
  publish: true,
  name: 'My Mall',
  address: '4, MG Road',
  city: 'Pune',
  postal_code: '411019',
  country: 'IN',
  coordinates: {
    latitude: '18.536749832311695',
    longitude: '73.87877582742291',
  },
  evses: [{
    uid: 'EVSE01',
    evse_id: 'IN*CGD*ECP0001',
    status: 'AVAILABLE',
    connectors: [{
      ...ccs2connector,
      last_updated: '2015-03-16T10:10:02Z',
    }],
    physical_reference: 'Connector1',
    last_updated: '2015-06-28T08:12:01Z',
  }, {
    uid: 'EVSE02',
    evse_id: 'IN*CGD*ECP0002',
    status: 'AVAILABLE',
    connectors: [{
      ...ccs2connector,
      last_updated: '2015-03-16T10:10:02Z',
    }],
    physical_reference: 'Connector2',
    last_updated: '2015-06-29T20:39:09Z',
  }],
  time_zone: 'India',
  last_updated: '2015-06-29T20:39:09Z',
};

const sampleLocations = (req, res)=> {
  res.json(locations);
};

function addRoutes(app) {
  app.get('/ocpi/2.2/locations', sampleLocations);
}

module.exports = {addRoutes};
