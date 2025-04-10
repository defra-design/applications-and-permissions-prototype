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
        // This page name needs to be the next page the user gets to after successfully continuing
        res.redirect('biosecurity-intro');
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////      Intro page routing to questions               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    router.get(section + 'biosecurity-intro-router', function (req, res)
    {
        // This page name needs to be the next page the user gets to after successfully continuing
        res.redirect('kept-separately');
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
            res.redirect('manure-and-slurry-details');
        }
        else if (req.session.data['biosecurity-kept-separately-radios-yes-no'] == "I don't know")
        {
            res.redirect('people-disinfection');
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
                res.redirect('grazing-field-how-separated');
            }
        }
        else if (req.session.data['biosecurity-grazing-radios-yes-no'] == "No")
        {
            res.redirect('manure-and-slurry-details');
        }
        else if (req.session.data['biosecurity-grazing-radios-yes-no'] == "I don't know")
        {
            res.redirect('manure-and-slurry-details');
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
            res.redirect('last-grazed');

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
                res.redirect('manure-and-slurry-details');
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
                res.redirect('manure-and-slurry-details');
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
    ////////////////       Details about manure and slurry              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get(section + 'manure-and-slurry-details-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        if (req.session.data['biosecurity-manure-and-slurry-details-text-input'] == undefined || req.session.data['biosecurity-manure-and-slurry-details-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('manure-and-slurry-details');
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

        req.session.data['biosecurity-disinfectant-rate'] = "";
        req.session.data['disinfectanttype'] = "";


        // Validation check if field is blank
        if (req.session.data['biosecurity-disinfectant-type-ahead'] == undefined || req.session.data['biosecurity-disinfectant-type-ahead'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('disinfectant');
        }


        else
        {



            let dissinfactantslist =
                [
                  ['Agrichlor', '12', 'solid'],
                  ['Anigene NaDCC', '12', 'solid'],
                  ['Anigene Professional Chlorine Tablets', '74', 'solid'],
                  ['Aquatabs 8.68g', '74', 'solid'],
                  ['Bi-OO-Cyst', '15', 'liquid'],
                  ['Bimodex', '14', 'liquid'],
                  ['BioChlor 200', '12', 'solid'],
                  ['BioChlor 500', '12', 'solid'],
                  ['Biocid 30', '14', 'liquid'],
                  ['BioPhen Xtra', '10', 'liquid'],
                  ['BIOSPOT', '12', 'solid'],
                  ['Coxicur', '15', 'liquid'],
                  ['Credence 1000', '74', 'solid'],
                  ['Dis-In-Fect', '12', 'solid'],
                  ['FAM 30', '14', 'liquid'],
                  ['High Power Sanitising Tablets 3.25g', '12', 'solid'],
                  ['Interkokask', '32.33', 'liquid'],
                  ['Interkokask Concentrate', '32.33', 'liquid'],
                  ['Iodo-Pharm', '14', 'liquid'],
                  ['Mida CHRIOX F2', '1', 'liquid'],
                  ['Mira 30', '14', 'liquid'],
                  ['MS MEGADES OXY D', '1', 'liquid'],
                  ['NEOGEN Farm Fluid MAX', '20', 'liquid'],
                  ['Novagen F.P.', '5', 'liquid'],
                  ['OmniChlor Plus', '12', 'solid'],
                  ['Prophyl S', '15', 'liquid'],
                  ['Rapicid', '14', 'liquid'],
                  ['Septrivet 17', '74', 'solid'],
                  ['Septrivet 87 8.68g', '74', 'solid'],
                  ['Stable Safe Strength 4.72g Tablets', '12', 'solid'],
                  ['Tibicur', '5', 'liquid'],
                  ['Total Farm Disinfectant', '14', 'liquid'],
                  ['V18', '14', 'liquid'],
                  ['Virkon® LSP', '10', 'liquid'],
                  ['Virochlor 500', '12', 'solid'],
                  ['Virophor 2.8%', '14', 'liquid'],
                  ['Virudine Plus', '14', 'liquid']
                ]

            let searchinput = String(req.session.data['biosecurity-disinfectant-type-ahead']).toLowerCase();
            let indexoutput = -1;

            // find the index of the entry in the list of dissinfactants
            for (let i = 0; i < dissinfactantslist.length; i++)
            {
                const subArray = dissinfactantslist[i];

                if (subArray[0].toLowerCase() === searchinput)
                {
                    indexoutput = i; // Return the index of the outer array
                }
            }

            console.log("index of output " + indexoutput);

            if (indexoutput == -1 )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeotwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('disinfectant');
            }
            else
            {
                // dissinfectant was a match

                // find out the dilution rate
                req.session.data['biosecurity-disinfectant-rate'] = dissinfactantslist[indexoutput][1];

                // set dissinfectant type
                req.session.data['disinfectanttype'] = dissinfactantslist[indexoutput][2];


                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('disinfectant-dilution');
            }

        }


    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    Disinfection rate               ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////



    router.post(section + 'disinfectant-dilution-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['biosecurity-disinfectant-dilution-checkboxes'] == undefined  ||
            req.session.data['biosecurity-disinfectant-dilution-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('disinfectant-dilution');
        }

        else
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
    })



























    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Housing the cattle                        ////////////////
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
                res.redirect('equipment-any-shared');
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
            res.redirect('equipment-any-shared');
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         SHARED EQUIPMENT                           ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'equipment-any-shared-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['biosecurity-equipment-any-shared-radios-yes-no'] == "Yes")
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
                res.redirect('equipment-how-minimise-contamination');
            }
        }
        else if (req.session.data['biosecurity-equipment-any-shared-radios-yes-no'] == "No")
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
            res.redirect('equipment-any-shared');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       SHARED EQUIPMENT                             ////////////////
    ////////////////                                                    ////////////////
    ////////////////                        TEXT AREA                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get(section + 'equipment-how-minimise-contamination-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        if (req.session.data['biosecurity-equipment-how-minimise-contamination-text-input'] == undefined || req.session.data['biosecurity-equipment-how-minimise-contamination-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('equipment-how-minimise-contamination');
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
            res.redirect('badgers');
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
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // Validation check if field is blank
        if (req.session.data['biosecurity-badgers-text-input'] == undefined || req.session.data['biosecurity-badgers-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('badgers');
        }
        else
        {
            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('check-answers');
        }

    })



















}
