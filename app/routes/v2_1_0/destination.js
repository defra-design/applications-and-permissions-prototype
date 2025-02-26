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
    let section = "/create-application/destination/";


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
    ////////////////        type of destination premises/farm           ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.get( section + 'routing-start', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
        {
            // Continue to the next pages where farmer is the origin
            res.redirect('type-of-destination');
        }

        else
        {
            // Continue to the next pages where farmer is the destination
            res.redirect('type-of-destination');
        }

    })









    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        type of destination premises/farm           ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.post( section + 'type-of-destination-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        req.session.data['camefromcheckanswers'] = false;

        // If Yes was selected, continue to next page
        if (req.session.data['destination-type-of-destination-radios'] == "Slaughter")
        {
            // Continue to the next page
            res.redirect('use-general-licence');
        }

        else if (req.session.data['destination-type-of-destination-radios'] == "Dedicated sale for TB (orange market)")
        {
            // Continue to the next page
            res.redirect('check-answers');
        }

        else if (req.session.data['destination-type-of-destination-radios'] == "Approved finishing unit (AFU)")
        {
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('own-farm-new-cph');
            }
            else
            {
                res.redirect('check-answers');
            }
        }

        else if (req.session.data['destination-type-of-destination-radios'] == "TB restricted farm")
        {
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('own-farm-new-cph');
            }
            else
            {
                res.redirect('contact-the-tb-restricted-farm');
            }
        }

        else if (req.session.data['destination-type-of-destination-radios'] == "Another destination")
        {
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('type-of-destination-page-2');
            }
            else
            {
                res.redirect('type-of-destination-page-2');
            }
        }

        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-destination');
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        CPH of destination premises/farm            ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'destination-farm-cph-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['destination-destination-farm-cph-text-input'] == undefined || req.session.data['destination-destination-farm-cph-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-cph');
        }

        else
        {
            let regexpattern = /^(\d{2})\/(\d{3})\/(\d{4})$/;
            let cphentered = req.session.data['destination-destination-farm-cph-text-input'];
            let cphnospaces = cphentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('destination-farm-cph');
            }
            else
            {
                res.redirect('destination-farm-address');
            }
        }

    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        Type of destination premises                ////////////////
    ////////////////          for in and outbound animals               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'type-of-destination-page-2-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['destination-type-of-destination-page-2-radios'] == "Zoo with TB restrictions")
        {
            // Continue to the next page
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('own-farm-new-cph');
            }
            else
            {
                res.redirect('contact-the-tb-restricted-zoo');
            }
        }
        else if (req.session.data['destination-type-of-destination-page-2-radios'] == "Laboratory")
        {
            // Continue to the next page
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('own-farm-new-cph');
            }
            else
            {
                res.redirect('destination-farm-cph');
            }
        }
        else if (req.session.data['destination-type-of-destination-page-2-radios'] == "Another destination")
        {
            // end page next
            res.redirect('type-of-destination-other');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-destination-page-2');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         Manual entry of destination type                ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'type-of-destination-other-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['destination-type-of-destination-other-text-input'] == undefined || req.session.data['destination-type-of-destination-other-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type-of-destination-other');
        }

        else
        {
            if (req.session.data['origin-to-or-from-own-premises-radios'] == "On to the farm or premises")
            {
                res.redirect('own-farm-new-cph');
            }
            else
            {
                res.redirect('destination-farm-cph');
            }
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        CPH of own destination premises/farm        ////////////////
    ////////////////                                                    ////////////////
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
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['destination-own-farm-new-cph-text-input'] == undefined || req.session.data['destination-own-farm-new-cph-text-input'] == "")
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
            let cphentered = req.session.data['destination-own-farm-new-cph-text-input'];
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
    ////////////////        Address of destination farm                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'destination-farm-address-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if line 1 field is blank
        if (req.session.data['destination-destination-farm-address-line-1'] == undefined || req.session.data['destination-destination-farm-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-address');
        }
        // Validation check if town field is blank
        else if (req.session.data['destination-destination-farm-address-town'] == undefined || req.session.data['destination-destination-farm-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-address');
        }

        // Validation check if postcode field is blank
        else if (req.session.data['destination-destination-farm-address-postcode'] == undefined || req.session.data['destination-destination-farm-address-postcode'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-address');
        }
        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let addressentered = req.session.data['destination-destination-farm-address-postcode'];
            let cphnospaces = addressentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('destination-farm-address');
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
    ////////////////        Address of OWN destination farm             ////////////////
    ////////////////                                                    ////////////////
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
        if (req.session.data['destination-own-address-line-1'] == undefined || req.session.data['destination-own-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('own-farm-new-address');
        }
        // Validation check if town field is blank
        else if (req.session.data['destination-own-address-town'] == undefined || req.session.data['destination-own-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('own-farm-new-address');
        }

        // Validation check if postcode field is blank
        else if (req.session.data['destination-own-address-postcode'] == undefined || req.session.data['destination-own-address-postcode'] == "")
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
            let addressentered = req.session.data['destination-own-address-postcode'];
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
                // Continue to check answers
                res.redirect('reason-for-movement');
            }
        }

    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        CPH of destination Finishing Unit           ////////////////
    ////////////////               NOT NEEDED FOR TB                    ////////////////
    ////////////////             PROBABLY DELETE IN FUTURE              ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'destination-tb-finishing-unit-cph-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['destination-tb-finishing-unit-cph-text-input'] == undefined || req.session.data['destination-tb-finishing-unit-cph-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-cph');
        }

        else if (req.session.data['destination-tb-finishing-unit-cph-text-input'].length > 13)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-cph');
        }

        else if (req.session.data['destination-tb-finishing-unit-cph-text-input'].length < 9)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-farm-cph');
        }

        else
        {
            // check no illegal charcters have been used
            const acceptableCharacters =  " 0123456789/-";
            let inputtext = req.session.data['destination-tb-finishing-unit-cph-text-input'];

            let dissallowedCharacters = "";

            // go through every character in the input and save  illegals ones
            for (var i = 0; i < inputtext.length; i++)
            {
                let  singlecharacter = inputtext.charAt(i);

                if( acceptableCharacters.includes( singlecharacter ) )
                {
                    // character is fine skip it
                }
                else
                {
                    // save this invalid character
                    // if character is alread in tsring then don't add it
                    if( dissallowedCharacters.includes( singlecharacter ) == false )
                    {
                        dissallowedCharacters = dissallowedCharacters.concat(singlecharacter);
                    }
                }
            }

            if(0 < dissallowedCharacters.length)
            {
                req.session.data['dissallowedcharacters'] = dissallowedCharacters;

                // Trigger validation and relaunch the page for invalid characters
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('destination-farm-cph');
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
                    res.redirect('check-answers');
                }
            }
        }
    })












    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////            destination market type                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'market-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['destination-market-type-radios'] == "Orange market")
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

        else if (req.session.data['destination-market-type-radios'] == "Red market")
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

        else if (req.session.data['destination-market-type-radios'] == "Another type of market")
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
            res.redirect('market-type');
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
        if (req.session.data['destination-ruminants-any-60-days-radios-yes-no'] == "Yes")
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
        else if (req.session.data['destination-ruminants-any-60-days-radios-yes-no'] == "No")
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
                res.redirect('reason-for-movement');
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
        if (req.session.data['destination-ruminants-know-cph-radios-yes-no'] == "Yes")
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
        else if (req.session.data['destination-ruminants-know-cph-radios-yes-no'] == "No")
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
                res.redirect('reason-for-movement');
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
        res.redirect('reason-for-movement');
    })









    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         Select own farm or new own farm            ////////////////
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
        if (req.session.data['destination-selection-of-own-premises-radios'] == "Your farm, New road, EK32 9LR")
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
                // If bluetongue
                if (req.session.data['bluetongue'] == "true")
                {
                    res.redirect('ruminants-any-60-days');
                }
                else
                {
                    res.redirect('reason-for-movement');
                }
            }
        }

        else if (req.session.data['destination-selection-of-own-premises-radios'] == "Another location")
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
                // If bluetongue
                if (req.session.data['bluetongue'] == "true")
                {
                    res.redirect('ruminants-any-60-days');
                }
                else
                {
                    res.redirect('reason-for-movement');
                }
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
    ////////////////            Reason for movement                     ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'reason-for-movement-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['destination-reason-for-movement-radios'] == "Routine restocking")
        {
            if((req.session.data['destination-type-of-destination-radios'] == "TB restricted farm"
                || req.session.data['destination-type-of-destination-page-2-radios'] == "Zoo with TB restrictions")
                &&
                (req.session.data['origin-type-of-origin-radios'] == "TB restricted farm"
                || req.session.data['origin-type-of-origin-page-2-radios'] == "Zoo with TB restrictions"))
            {
                res.redirect('how-many-animals');
            }
            else
            {
                // Continue to the next page
                res.redirect('quantity-options');
            }

        }
        else if (req.session.data['destination-reason-for-movement-radios'] == "Breeding male")
        {
            // Continue to the next page
            res.redirect('any-additional-info');
        }
        else if (req.session.data['destination-reason-for-movement-radios'] == "Welfare")
        {
            // Continue to the next page
            res.redirect('any-additional-info');
        }
        else if (req.session.data['destination-reason-for-movement-radios'] == "Something else")
        {
            // Continue to the next page
            res.redirect('any-additional-info');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('reason-for-movement');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                 NUMBER ENTRY                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'how-many-animals-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";


        // Validation check if field is blank
        if (req.session.data['destination-how-many-animals-number-input'] == undefined || req.session.data['destination-how-many-animals-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('how-many-animals');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['destination-how-many-animals-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['destination-how-many-animals-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeotwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('how-many-animals');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );


                // Check input is a whole number
                if( numberinputfloat % 1 != 0 )
                {
                    // Trigger validation and relaunch the page
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypetwo'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('how-many-animals');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('how-many-animals');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['destination-how-many-animals-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to be the next page the user gets to after successfully continuing
                    res.redirect('check-answers');

                }
            }

        }

    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////            Bluetongue - Are any pregnant           ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post( section + 'pregnant-any-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['destination-pregnant-any-radios-yes-no'] == "Yes")
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
                res.redirect('pregnant-earliest-birth-date');
            }
        }
        else if (req.session.data['destination-pregnant-any-radios-yes-no'] == "No")
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
                if (req.session.data['destination-reason-for-movement-radios'] == "Restocking")
                {
                    res.redirect('quantity-options');
                }
                else
                {
                    res.redirect('any-additional-info');
                }
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('pregnant-any');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   DATE ENTRY                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post( section + 'pregnant-earliest-birth-date-router', function (req, res)
    {
        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////           Resetting all errors to off              ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // set in page errors to off
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";
        req.session.data['errortypeeight'] = "false";
        req.session.data['errortypenine'] = "false";
        req.session.data['errortypeten'] = "false";
        req.session.data['errortypeeleven'] = "false";
        req.session.data['errortypetwelve'] = "false";
        req.session.data['errortypethirteen'] = "false";
        req.session.data['errortypefourteen'] = "false";
        req.session.data['errortypefifteen'] = "false";
        req.session.data['errortypesixteen'] = "false";
        req.session.data['errortypeseventeen'] = "false";

        // set javascript field check error to off
        let dayEmpty = false;
        let monthEmpty = false;
        let yearEmpty = false;






        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['destination-pregnant-earliest-birth-date-date-input-day'] == undefined
            || req.session.data['destination-pregnant-earliest-birth-date-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['destination-pregnant-earliest-birth-date-date-input-month'] == undefined
            || req.session.data['destination-pregnant-earliest-birth-date-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['destination-pregnant-earliest-birth-date-date-input-year'] == undefined
            || req.session.data['destination-pregnant-earliest-birth-date-date-input-year'] == "" )
        {
            yearEmpty = true;
        }


        // Redirect to same page if errors
        if (dayEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (monthEmpty && yearEmpty )
            {
                // all fields are empty
                req.session.data['errortypeone'] = "true";
            }
            else if(monthEmpty)
            {
                // day and month are empty only
                req.session.data['errortypefive'] = "true";
            }
            else if (yearEmpty)
            {
                // day and year are empty only
                req.session.data['errortypesix'] = "true";
            }
            else
            {
                // just day is empty
                req.session.data['errortypetwo'] = "true";
            }
        }
        else if (monthEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (yearEmpty)
            {
                // month and year are empty only
                req.session.data['errortypeseven'] = "true";
            }
            else
            {
                // just month is empty
                req.session.data['errortypethree'] = "true";
            }
        }
        else if (yearEmpty)
        {
            req.session.data['errorthispage'] = "true";
            // Only year is empty
            req.session.data['errortypefour'] = "true";
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 8 - Incorrect/invalid characters entered for Year        ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if (  isNaN(req.session.data['destination-pregnant-earliest-birth-date-date-input-year']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeight'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 9 - Year must be a 4 digit number         /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            if (  req.session.data['destination-pregnant-earliest-birth-date-date-input-year'] < 1000  ||  9999 < req.session.data['destination-pregnant-earliest-birth-date-date-input-year']  )
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypenine'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ////////     Error 10 - Incorrect/invalid characters entered for MONTH       ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['destination-pregnant-earliest-birth-date-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['destination-pregnant-earliest-birth-date-date-input-month'] < 1  ||  12 < req.session.data['destination-pregnant-earliest-birth-date-date-input-month'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 11 - Incorrect/invalid characters entered for DAY       /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            var quanityofdaysinmonth =  new Date(req.session.data['destination-pregnant-earliest-birth-date-date-input-year'], req.session.data['destination-pregnant-earliest-birth-date-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['destination-pregnant-earliest-birth-date-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['destination-pregnant-earliest-birth-date-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['destination-pregnant-earliest-birth-date-date-input-day'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////      Generate date object and update user's inputted date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        let inputdate = new Date();

        if (req.session.data['errorthispage'] != "true")
        {
            inputdate = new Date(
                req.session.data['destination-pregnant-earliest-birth-date-date-input-year'],
                req.session.data['destination-pregnant-earliest-birth-date-date-input-month'] - 1,
                req.session.data['destination-pregnant-earliest-birth-date-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['destination-pregnant-earliest-birth-date-date-input-day'] = inputdate.getDate();
            req.session.data['destination-pregnant-earliest-birth-date-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['destination-pregnant-earliest-birth-date-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['destination-pregnant-earliest-birth-date-date-input-year'] = inputdate.getFullYear();
        }






            ////////////////////////////////////////////////////////////////////////////////////
            /////////        Error 13 - date is BEFORE previous/closed tax year        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (inputdate < taxyearstartdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypethirteen'] = "true";
            }
        }





        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('pregnant-earliest-birth-date')
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( 'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            // For PLACEHOLDER template only. This should go to the next page.
            if (req.session.data['destination-reason-for-movement-radios'] == "Restocking")
            {
                res.redirect('quantity-options');
            }
            else
            {
                res.redirect('any-additional-info');
            }
        }


    })














    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             75 or more cattle                      ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post( section + 'quantity-options-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['destination-quantity-options-radios'] == "No")
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
                res.redirect('quantity-half-herd');
            }
        }
        else if (req.session.data['destination-quantity-options-radios'] == "Yes")
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
        else if (req.session.data['destination-quantity-options-radios'] == "I don't know")
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
            res.redirect('quantity-options');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////         Half the herd size or not                  ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post( section + 'quantity-half-herd-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['destination-quantity-half-herd-radios'] == "No")
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
        else if (req.session.data['destination-quantity-half-herd-radios'] == "Yes")
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
        else if (req.session.data['destination-quantity-half-herd-radios'] == "I don't know")
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
            res.redirect('quantity-half-herd');
        }
    })









}
