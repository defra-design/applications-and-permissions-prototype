const {log} = require("govuk-prototype-kit/migrator/logger");

module.exports = function (router) {


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/create-application/biosecurity/";


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
    ////////////////       Initial routing based on cattle type         ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get(section + 'begin-biosecurity-details-section', function (req, res)
    {
        // If the movement is a bull or welfare then don't ask biosecurity questions
        if (req.session.data['destination-reason-for-movement-radios'] == 'Bull' ||
            req.session.data['destination-reason-for-movement-radios'] == 'Welfare')
        {
            res.redirect('people-disinfection');
        }
        else
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('kept-separately');
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       Will incoming cattle be kept separately?     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'kept-separately-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['biosecurity-kept-separately-radios-yes-no'] == "Yes")
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
                res.redirect('grazing');
            }
        }
        else if (req.session.data['biosecurity-kept-separately-radios-yes-no'] == "No")
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
                res.redirect('people-disinfection');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('kept-separately');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        grazing of incoming cattle  yes or no       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'grazing-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['biosecurity-grazing-radios-yes-no'] == "Yes")
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
                res.redirect('last-grazed');
            }
        }
        else if (req.session.data['biosecurity-grazing-radios-yes-no'] == "No")
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
                res.redirect('roads-and-tracks');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('grazing');
        }
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        when the land was last grazed               ////////////////
    ////////////////             free text field                        ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.post(section + 'last-grazed-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['biosecurity-last-grazed-text-input'] == undefined || req.session.data['biosecurity-last-grazed-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('last-grazed');
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
                res.redirect('manure-and-slurry');
            }
        }

    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       Manure and slurry in the past 60 days        ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'manure-and-slurry-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['biosecurity-manure-and-slurry-radios-yes-no'] == "Yes")
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
                res.redirect('grazing-field-how-separated');
            }
        }
        else if (req.session.data['biosecurity-manure-and-slurry-radios-yes-no'] == "No")
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
                res.redirect('grazing-field-how-separated');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('manure-and-slurry');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       Initial routing based on cattle type         ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get(section + 'grazing-field-how-separated-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        if (req.session.data['biosecurity-grazing-field-how-separated-text-input'] == undefined || req.session.data['biosecurity-grazing-field-how-separated-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('grazing-field-how-separated');
        }
        else
        {
            // Always proceed to the next questions on shared tracks
            res.redirect('roads-and-tracks');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////            Any shared roads and tracks             ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'roads-and-tracks-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['biosecurity-roads-and-tracks-radios-yes-no'] == "Yes")
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
                res.redirect('buildings-any-shared');
            }
        }
        else if (req.session.data['biosecurity-roads-and-tracks-radios-yes-no'] == "No")
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
                res.redirect('buildings-any-shared');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('roads-and-tracks');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Any shared buildings with the herd        ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'buildings-any-shared-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['biosecurity-buildings-any-shared-radios-yes-no'] == "Yes")
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
                res.redirect('buildings-how-minimise-contamination');
            }
        }
        else if (req.session.data['biosecurity-buildings-any-shared-radios-yes-no'] == "No")
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
                res.redirect('people-disinfection');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('buildings-any-shared');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       How will shared buildings be kept clean      ////////////////
    ////////////////                                                    ////////////////
    ////////////////                        TEXT AREA                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get(section + 'buildings-how-minimise-contamination-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        if (req.session.data['biosecurity-buildings-how-minimise-contamination-text-input'] == undefined || req.session.data['biosecurity-buildings-how-minimise-contamination-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('buildings-how-minimise-contamination');
        }
        else
        {
            // Always proceed to the next questions on shared tracks
            res.redirect('people-disinfection');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       How people avoid contamination               ////////////////
    ////////////////                                                    ////////////////
    ////////////////                        TEXT AREA                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get(section + 'people-disinfection-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        if (req.session.data['biosecurity-people-disinfection-text-input'] == undefined || req.session.data['biosecurity-people-disinfection-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('people-disinfection');
        }
        else
        {
            // Always proceed to the next questions on shared tracks
            res.redirect('disinfectant');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        What disinfectants are is being used        ////////////////
    ////////////////                                                    ////////////////
    ////////////////               TEXT ENTRY - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'disinfectant-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['biosecurity-disinfectant-text-input'] == undefined || req.session.data['biosecurity-disinfectant-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('disinfectant');
        }


        else
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('disinfectant-dilution');
        }


    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    Disinfection rate               ////////////////
    ////////////////                                                    ////////////////
    ////////////////                    NUMBER ENTRY                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'disinfectant-dilution-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";


        // Validation check if field is blank
        if (req.session.data['biosecurity-disinfectant-dilution-number-input'] == undefined || req.session.data['biosecurity-disinfectant-dilution-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('disinfectant-dilution');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['biosecurity-disinfectant-dilution-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(nocommasinput) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('disinfectant-dilution');
            }
            else
            {
                // everything with the input is fine so move on to next page
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );

                // Format the number with commas
                req.session.data['biosecurity-disinfectant-dilution-number-input'] = numberinputfloat.toLocaleString();


                // If the user needs to go back to 'check your answers' then take them directly there
                if (req.session.data['camefromcheckanswers'] == 'true')
                {
                    req.session.data['camefromcheckanswers'] = false;
                    res.redirect('check-answers');
                }
                else
                {
                    // This page name needs to be the next page the user gets to after successfully continuing
                    res.redirect('badgers');
                }

            }

        }

    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Badger separation                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////                    NUMBER ENTRY                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    router.get(section + 'badgers-router', function (req, res)
    {
        // Always proceed to the next questions on shared tracks

        let originalString = String(req.session.data['biosecurity-badgers-checkboxes']);
        let newString = originalString.replace(/,(?!\s)/g, "\n\n");

        req.session.data['biosecurity-badgers-checkboxes-formatted'] = newString;

        res.redirect('check-answers');
        // Possibly add empty field error in future
    })










}
