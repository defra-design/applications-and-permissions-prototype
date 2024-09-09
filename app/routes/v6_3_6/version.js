const govukPrototypeKit = require('govuk-prototype-kit');

const version = 'v6_3_6';

const router = govukPrototypeKit.requests.setupRouter('/' + version);

// Import subfiles
require('./what.js')(router);
require('./origin.js')(router);
require('./destination.js')(router);
require('./tests.js')(router);
require('./biosecurity.js')(router);
require('./identification.js')(router);




