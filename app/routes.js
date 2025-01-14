//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')

const router = govukPrototypeKit.requests.setupRouter()


// Including other routing javascript
// This single line tells this 'routes.js' file to include the routing from the 'templates.js' file
require('./routes/templates.js');
require('./routes/v0_1_0/version.js');
require('./routes/v0_2_0/version.js');
require('./routes/v0_4_0/version.js');
require('./routes/v0_3_0/version.js');
require('./routes/v1_0_0/version.js');
require('./routes/v1_1_0/version.js');
require('./routes/v1_2_0/version.js');
require('./routes/v2_0_0/version.js');
require('./routes/v3_0_0/version.js');
require('./routes/latest/version.js');



// viewing session data
// When the user goes to 'prototype-admin/view-data' this collects all the session data
// Then it opens 'prototypetools/view-data' and passes the session data into that page to be displayed.
router.get('*/prototype-admin/view-data', function(req, res){

    querystring = '';
    for ( var key in req.session.data )
    {
        querystring += key +'=' + req.session.data[key] + '&';
    }

    res.render('prototypetools/view-data', { data: JSON.stringify( req.session, null, 2), querystring: querystring } );
})



// Saving the session data to the clipboard using another page.
// When a user goes to 'prototype-admin/update-session-data' the page collects all the session data.
// Then redirects to a new page 'prototypetools/copy-url-to-clipboard' which copies the data to the clipboard.
//  The user can then share the state by sending someone the copied URL.
router.get('*/prototype-admin/update-session-data', function(req, res){

    var querystringtemp = '';
    for ( var key in req.session.data )
    {
        querystringtemp += key +'=' + req.session.data[key] + '&';
    }

    req.session.data['theoutputquerystring'] = "";
    req.session.data['theoutputquerystring'] = "?" + querystringtemp;

    res.redirect('../prototypetools/copy-url-to-clipboard');
})


// accepting or rejecting cookies
router.get('/cookies-form-handler', function(req, res){

    if(req.session.data['cookies']['analytics'] == "yes")
    {
        res.redirect('cookies?cookiesaccepted=true&cookiesrejected=false&');
    }
    else
    {
        res.redirect('/cookies?cookiesaccepted=false&cookiesrejected=true&');
    }


})
