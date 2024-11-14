const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {




    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/create-application/tests/";


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
    router.get(section + 'routing-tests', function (req, res)
    {
        // If bluetongue
        if (req.session.data['bluetongue'] == "true")
        {
            res.redirect('bluetongue-vaccinations');
        }
        // If Yes was selected, continue to next page
        else if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
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
    ////////////////            Bluetongue vaccinations                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'bluetongue-vaccinations-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['tests-bluetongue-vaccinations-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('bluetongue-vaccination-age');
            }
        }
        else if (req.session.data['tests-bluetongue-vaccinations-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // Continue to next page
                if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
                {
                    // Continue to the next pages where farmer is the origin
                    res.redirect('destination-confirmation');
                }

                else
                {
                    // Continue to the next pages where farmer is the destination
                    res.redirect('whole-herd-test');
                }
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('bluetongue-vaccinations');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'bluetongue-vaccination-age-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['tests-bluetongue-vaccination-age-radios'] == "Less than 1 month" ||
            req.session.data['tests-bluetongue-vaccination-age-radios'] == "Less than 3 months" ||
            req.session.data['tests-bluetongue-vaccination-age-radios'] == "Less than 9 months" ||
            req.session.data['tests-bluetongue-vaccination-age-radios'] == "More than 9 months"
        )
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // Continue to next page
                if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
                {
                    // Continue to the next pages where farmer is the origin
                    res.redirect('destination-confirmation');
                }

                else
                {
                    // Continue to the next pages where farmer is the destination
                    res.redirect('whole-herd-test');
                }
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('bluetongue-vaccination-age');
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
    router.get(section + 'origin-confirmation-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['tests-origin-confirmation-checkboxes'] == undefined  ||
            req.session.data['tests-origin-confirmation-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('origin-confirmation');
        }

        else
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

        }

    })




}
