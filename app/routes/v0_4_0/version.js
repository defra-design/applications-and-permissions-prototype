const govukPrototypeKit = require('govuk-prototype-kit');

const version = 'v0_4_0';

const router = govukPrototypeKit.requests.setupRouter('/' + version);

// Import subfiles
require('./what.js')(router);
require('./origin.js')(router);
require('./destination.js')(router);
require('./when.js')(router);
require('./tests.js')(router);
require('./biosecurity.js')(router);
require('./biosecurity-map.js')(router);
require('./identification.js')(router);
require('./contact-and-updates.js')(router);
require('./submit.js')(router);


