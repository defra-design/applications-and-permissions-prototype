const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    const section = "/create-application/origin/";


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
    ////////////////          Movement to or from own from              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'to-or-from-own-premises-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
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
                res.redirect('type-of-origin');
            }
        }

        else if (req.session.data['origin-to-or-from-own-premises-radios'] == "Off the farm or premises")
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
                res.redirect('selection-of-own-premises');
            }
        }

        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('to-or-from-own-premises');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        Select own farm or new own farm             ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'selection-of-own-premises-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['origin-selection-of-own-premises-radios'] == "Your farm, New road, EK32 9LR")
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
                // If Yes was selected, continue to next page
                if (req.session.data['bluetongue'] == "true")
                {
                    res.redirect('ruminants-any-60-days');
                }
                else
                {
                    // Continue to check answers
                    res.redirect('check-answers');
                }
            }
        }
        else if (req.session.data['origin-selection-of-own-premises-radios'] == "Another location")
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
                res.redirect('own-farm-new-cph');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('selection-of-own-premises');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        CPH of own farm when it's origin            ////////////////
    ////////////////        entering a new location's CPH               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'own-farm-new-cph-router', function (req, res)
    {
        // This page name needs to match the page the user was just on
        res.redirect('own-farm-new-address');
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        Address of own farm when it's origin        ////////////////
    ////////////////        entering a new location's CPH               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'own-farm-new-address-router', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['bluetongue'] == "true")
        {
            res.redirect('ruminants-any-60-days');
        }
        else
        {
            // Continue to check answers
            res.redirect('check-answers');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        Type of origin premises                     ////////////////
    ////////////////                 for inbound animals                ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'type-of-origin-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['origin-type-of-origin-radios'] == "A market")
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
                res.redirect('fifty-percent-warning');
            }
        }
        else if (req.session.data['origin-type-of-origin-radios'] == "A farm")
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
                res.redirect('origin-farm-cph');
            }
        }
        else if (req.session.data['origin-type-of-origin-radios'] == "Approved finishing unit (AFU)")
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
                res.redirect('fifty-percent-warning');
            }
        }
        else if (req.session.data['origin-type-of-origin-radios'] == "Movement after import")
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
                res.redirect('fifty-percent-warning');
            }
        }
        else if (req.session.data['origin-type-of-origin-radios'] == "Another origin")
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
                res.redirect('fifty-percent-warning');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-origin');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        CPH of origin premises/farm                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'origin-farm-cph-router', function (req, res)
    {
        // This page name needs to match the page the user was just on
        res.redirect('origin-farm-address');
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////      Address of origin premises/farm               ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'origin-farm-address-router', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
        {
            res.redirect('fifty-percent-warning');
        }

        else if (req.session.data['origin-to-or-from-own-premises-radios'] == "Off the farm or premises")
        {
            // If Yes was selected, continue to next page
            if (req.session.data['bluetongue'] == "true")
            {
                res.redirect('ruminants-any-60-days');
            }
            else
            {
                // Continue to check answers
                res.redirect('check-answers');
            }
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        50% compensation warning                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'fifty-percent-warning-router', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['bluetongue'] == "true")
        {
            res.redirect('ruminants-any-60-days');
        }
        else
        {
            // Continue to check answers
            res.redirect('check-answers');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     Any ruminants onto farm in past 60 days        ////////////////
    ////////////////                 Bluetongue                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'ruminants-any-60-days-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['origin-ruminants-any-60-days-radios-yes-no'] == "Yes")
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
                res.redirect('ruminants-know-cph');
            }
        }
        else if (req.session.data['origin-ruminants-any-60-days-radios-yes-no'] == "No")
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
                res.redirect('check-answers');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('ruminants-any-60-days');
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                 Bluetongue                         ////////////////
    ////////////////   Know the CPH of where the ruminants are from     ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post( section + 'ruminants-know-cph-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['origin-ruminants-know-cph-radios-yes-no'] == "Yes")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('ruminants-60-days-cph');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('ruminants-60-days-cph');
            }
        }
        else if (req.session.data['origin-ruminants-know-cph-radios-yes-no'] == "No")
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
                res.redirect('check-answers');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('ruminants-know-cph');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                 Bluetongue                         ////////////////
    ////////////////        CPH of farm which 60 days ruminants         ////////////////
    ////////////////                 came from                          ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'ruminants-60-days-cph-router', function (req, res)
    {
        // This page name needs to match the page the user was just on
        res.redirect('check-answers');
    })

}
