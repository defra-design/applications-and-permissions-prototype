const govukPrototypeKit = require('govuk-prototype-kit');

const version = 'v4_0_0';

const router = govukPrototypeKit.requests.setupRouter('/' + version);

// Import subfiles
require('./what.js')(router);
require('./origin.js')(router);
require('./destination.js')(router);
require('./tests.js')(router);
require('./biosecurity.js')(router);
require('./biosecurity-map.js')(router);
require('./reactors.js')(router);
require('./identification.js')(router);
require('./contact-and-updates.js')(router);
require('./submit.js')(router);
require('./gov-gateway.js')(router);
require('./all-diseases-configurator.js')(router);
require('./exotics-about-the-movement.js')(router);
require('./exotics-movement-origin.js')(router);
require('./exotics-fmd.js')(router);
require('./case-management.js')(router);








