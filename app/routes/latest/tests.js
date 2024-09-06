const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {

    /*
        Setting a version in each routes.js file
        This allows you to make new version of the prototype and have the old versions still work
        This is done by making a copy of the routes files and updating just this version variable for the new version
     */
    let version = "";


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "create-application/tests";


    /*
        Each of the template html pages has corresponding routing javascript.
        This checks for errors and reloads the page showing the error.
        If there are no errors it goes to the next page or back to the 'check your answers' page
        ***  How to use this ***
        1. Copy the correct 'router.post ...' which matches the template you're using
        2. Paste those lines into the routes file for the section of your service you're working on.
        3. On that pasted javascript then use 'Find and replace' to replace the page name with whatever you named the html page/file.
            e.g replace 'PAGENAME_RADIOS' with 'select-country'
        4. On that pasted javascript use 'Find and replace' to replace the next page with whatever you named the next html page/file in the user journey.
            e.g replace 'THE_NEXT_PAGE_NAME' with 'enter-name'
        5. Not all errors will be required in your service.  Delete the lines of javascript which you don't need.
            e.g. If you don't have an upper limit on the number entry then remove the lines around 'else if ( numberinputfloat < 3 )'
        6. If you have a 'Check your answers' page/file in your journey make sure it is in the same folder and is named 'check-answers' to matcth this routing
                If you don't have a 'Check your answers' page/file then remove that javascript from the near the bottom of the javascript you copied.
                This should leave just 'res.redirect('THE_NEXT_PAGE_NAME');'
        7. Your html page should not have working routing.  Check each error and routing scenario works by entering data and clicking continue on that page.
     */





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        routing to origin or destination pages      ////////////////
    ////////////////      if destination or origin is a market          ////////////////
    ////////////////     then no need to get confirmations of tests?    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.get('/' + version + section + '/routing-tests', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to my premises/farm")
        {
            // Continue to the next pages where farmer is the origin
            res.redirect('destination-confirmation');
        }

        else
        {
            // Continue to the next pages where farmer is the destination
            res.redirect('origin-confirmation');
        }

    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        routing to to  destination pages            ////////////////
    ////////////////      if destination is a market                    ////////////////
    ////////////////     then no need to get confirmations of tests?    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.get('/' + version + section + '/origin-confirmation-router', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['destination-type-of-destination-radios'] == "A farm")
        {
            // Continue to the next pages where farmer is the origin
            res.redirect('destination-confirmation');
        }

        else
        {
            // Continue to the next pages where farmer is the destination
            res.redirect('../task-list?section-tests-complete=true&');
        }

    })





}
