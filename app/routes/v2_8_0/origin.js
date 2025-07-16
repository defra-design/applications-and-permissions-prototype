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
            // Check if user has changed their selection
            // If they have then the user need to redo the destination section
            if (req.session.data['on-or-off-history'] == "Off the farm or premises")
            {
                req.session.data['section-destination-complete'] = "false";
            }
            // Save what was previous selected for comparison if changed later
            req.session.data['on-or-off-history'] = "On to the farm or premises";


            // Continue to the next page
            // scope means this is not viable for release 1
            res.redirect('type-of-origin-on');
        }

        else if (req.session.data['origin-to-or-from-own-premises-radios'] == "Off the farm or premises")
        {
            // Check if user has changed their selection
            // If they have then the user need to redo the destination section
            if (req.session.data['on-or-off-history'] == "On to the farm or premises")
            {
                req.session.data['section-destination-complete'] = "false";
            }
            // Save what was previous selected for comparison if changed later
            req.session.data['on-or-off-history'] = "Off the farm or premises";


            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('type-of-origin-off');
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
    ////////////////        Type of origin premises                     ////////////////
    ////////////////         for animal moving off the premises         ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'type-of-origin-off-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        if (req.session.data['origin-type-of-origin-off-radios'] == "TB restricted farm")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('own-farm-new-cph');
        }
        else if (req.session.data['origin-type-of-origin-off-radios'] == "Approved finishing unit (AFU)")
        {
            res.redirect('own-farm-new-cph');
        }
        else if (req.session.data['origin-type-of-origin-off-radios'] == "Unrestricted farm or premises")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('contact-the-tb-restricted-farm');
        }
        else if (req.session.data['origin-type-of-origin-off-radios'] == "TB isolation unit")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('own-farm-new-cph');
        }
        else if (req.session.data['origin-type-of-origin-off-radios'] == "Another TB restricted origin")
        {
            // end page next
            res.redirect('type-of-origin-other');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-origin-off');
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
    router.post( section + 'type-of-origin-on-router', function (req, res)
    {
                // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        if (req.session.data['origin-type-of-origin-on-radios'] == "Unrestricted farms and markets")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('fifty-percent-warning');
        }
        else if (req.session.data['origin-type-of-origin-on-radios'] == "TB restricted farm")
        {
            res.redirect('origin-farm-cph');
        }
        else if (req.session.data['origin-type-of-origin-on-radios'] == "Approved finishing units (AFU)")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('origin-farm-cph');
        }
        else if (req.session.data['origin-type-of-origin-on-radios'] == 'Location after animals have been imported')
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('country');
        }
        else if (req.session.data['origin-type-of-origin-on-radios'] == "Another TB restricted origin")
        {
            // end page next
            res.redirect('type-of-origin-other');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-origin-on');
        }


    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        Type of origin premises                     ////////////////
    ////////////////          for in and outbound animals               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'type-of-origin-page-2-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['origin-type-of-origin-page-2-radios'] == "Zoo with TB restrictions")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('own-farm-new-cph');
        }
        else if (req.session.data['origin-type-of-origin-page-2-radios'] == "Laboratory with TB restrictions")
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('own-farm-new-cph');
        }
        else if (req.session.data['origin-type-of-origin-page-2-radios'] == "Another origin with TB restrictions")
        {
            // end page next
            res.redirect('type-of-origin-other');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-origin-page-2');
        }
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             COUNTRY ENTRY - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // COUNTRY ENTRY - NOT COMPLEX PAGE
    router.post( section + 'country-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['origin-country-country-type-ahead'] == undefined || req.session.data['origin-country-country-type-ahead'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('country');
        }

        else if (req.session.data['origin-country-country-type-ahead'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('country');
        }

        else
        {
            // everything with the input is fine so move on to next page

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
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         Manual entry of origin type                ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'type-of-origin-other-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['origin-type-of-origin-other-text-input'] == undefined || req.session.data['origin-type-of-origin-other-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-origin-other');
        }

        else
        {
            // everything with the input is fine so move on to next page
            // Continue to the next page
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('origin-farm-cph');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('own-farm-new-cph');
            }
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
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";

        // Validation check if field is blank
        if (req.session.data['origin-own-farm-new-cph-text-input'] == undefined || req.session.data['origin-own-farm-new-cph-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('own-farm-new-cph');
        }
        else
        {
            let regexpattern = /^(\d{2})\/(\d{3})\/(\d{4})$/;
            let cphentered = req.session.data['origin-own-farm-new-cph-text-input'];
            let cphnospaces = cphentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('own-farm-new-cph');
            }
            else
            {
                res.redirect('own-farm-new-address');
            }
        }

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
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if line 1 field is blank
        if (req.session.data['origin-own-address-line-1'] == undefined || req.session.data['origin-own-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('own-farm-new-address');
        }
        // Validation check if town field is blank
        else if (req.session.data['origin-own-address-town'] == undefined || req.session.data['origin-own-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('own-farm-new-address');
        }

        // Validation check if postcode field is blank
        else if (req.session.data['origin-own-address-postcode'] == undefined || req.session.data['origin-own-address-postcode'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('own-farm-new-address');
        }
        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let addressentered = req.session.data['origin-own-address-postcode'];
            let cphnospaces = addressentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('own-farm-new-address');
            }
            else
            {
                res.redirect('check-answers');
            }
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
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";

        // Validation check if field is blank
        if (req.session.data['origin-origin-farm-cph-text-input'] == undefined || req.session.data['origin-origin-farm-cph-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('origin-farm-cph');
        }
        else
        {
            let regexpattern = /^(\d{2})\/(\d{3})\/(\d{4})$/;
            let cphentered = req.session.data['origin-origin-farm-cph-text-input'];
            let cphnospaces = cphentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('origin-farm-cph');
            }
            else
            {
                // This page name needs to match the page the user was just on
                res.redirect('origin-farm-address');
            }
        }

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

        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if line 1 field is blank
        if (req.session.data['origin-origin-farm-address-line-1'] == undefined || req.session.data['origin-origin-farm-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('origin-farm-address');
        }
        // Validation check if town field is blank
        else if (req.session.data['origin-origin-farm-address-town'] == undefined || req.session.data['origin-origin-farm-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('origin-farm-address');
        }

        // Validation check if postcode field is blank
        else if (req.session.data['origin-origin-farm-address-postcode'] == undefined || req.session.data['origin-origin-farm-address-postcode'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('origin-farm-address');
        }
        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let addressentered = req.session.data['origin-origin-farm-address-postcode'];
            let cphnospaces = addressentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('origin-farm-address');
            }
            else
            {
                res.redirect('fifty-percent-warning');
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
