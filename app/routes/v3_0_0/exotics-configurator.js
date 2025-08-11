const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {




    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/exotics/disease-configurator/";


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
    router.get(section + 'routing-exotics-configurator-start', function (req, res)
    {
        // Continue to the next pages where farmer is the origin
        res.redirect('name-of-disease');
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                   DISEASE NAME                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'name-of-disease-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['disease-configurator-name-of-disease-text-input'] == undefined || req.session.data['disease-configurator-name-of-disease-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('name-of-disease');
        }

        else if (req.session.data['disease-configurator-name-of-disease-text-input'].length >100)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('name-of-disease');
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
                res.redirect('scope-of-things-everything');
            }

        }
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////      Licence needed to movement of everything      ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'scope-of-things-everything-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['disease-configurator-scope-of-things-everything-radios-yes-no'] == "Yes")
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

                req.session.data['disease-configurator-scope-of-things-other-checkboxes'] =
                [
                  "Animal products",
                  "Germplasm",
                  "Bedding and feed",
                  "Animal by-products and waste materials",
                  "Machinery and equipment",
                  "Carcasses"
                ]

                res.redirect('types-of-movement');
            }
        }
        else if (req.session.data['disease-configurator-scope-of-things-everything-radios-yes-no'] == "No")
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
                res.redirect('scope-of-things-all-animals');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('scope-of-things-everything');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               All type sof animals                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'scope-of-things-all-animals-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['disease-configurator-scope-of-things-all-animals-radios-yes-no'] == "Yes")
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
                res.redirect('scope-of-things-other');
            }
        }
        else if (req.session.data['disease-configurator-scope-of-things-all-animals-radios-yes-no'] == "No")
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
                res.redirect('scope-of-things-animals');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('scope-of-things-all-animals');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Animals needing a licence              ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'scope-of-things-animals-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-scope-of-things-animals-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-scope-of-things-animals-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('scope-of-things-animals');
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
                res.redirect('scope-of-things-other');
            }
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     Select non animals things that need licence    ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'scope-of-things-other-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-scope-of-things-other-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-scope-of-things-other-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('scope-of-things-other');
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
                res.redirect('types-of-movement');
            }
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         Types of movement that need a licence       ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'types-of-movement-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-types-of-movement-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-types-of-movement-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('types-of-movement');
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
                res.redirect('origin-types');
            }
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                   origin types                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'origin-types-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-origin-types-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-origin-types-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('origin-types');
        }

        else
        {
            // Continue to the next page
            // format the text in a new array to fit in the question for the matrix
            req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'] = [];
            const vowels = 'aeiou';

            for (let i = 0; i < req.session.data['disease-configurator-origin-types-checkboxes'].length; i++) {
                // Convert the item at the current index to lower case
                req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][i]
                    = req.session.data['disease-configurator-origin-types-checkboxes'][i].toString().toLowerCase();

                var firstLetter = req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][i].toString()[0].toLowerCase();


                if (vowels.includes(firstLetter))
                {
                    // If it is a vowel, add "an " to the front of the word
                    req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][i] = "an " + req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][i];
                }
                else
                {
                    req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][i] = "a " + req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][i];
                }
            }



            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('destination-types');
            }
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                 Destination types                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'destination-types-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-destination-types-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-destination-types-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('destination-types');
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
                // Count things for the loop
                if (req.session.data['origin-showing-in-loop'] == undefined)
                {
                    // if the selected origin is undefined then we're not in the loop and need to begin
                    let loopcounter = 0;
                    req.session.data['origin-loop-counter'] = loopcounter;

                    // set the first loop to the first item in the list
                    req.session.data['origin-showing-in-loop']
                        = req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][loopcounter];


                }

                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('select-destination-for-each-origin');
            }
        }
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////           Select destination of reach              ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'select-destination-for-each-origin-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";



        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-select-destination-for-each-origin-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-select-destination-for-each-origin-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('select-destination-for-each-origin');
        }

        else
        {
            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                // save the answers for the specific index changed
                var loopcounter = parseInt(req.session.data['origin-loop-counter']);
                req.session.data['origin-destination-matrix'][loopcounter]
                    = req.session.data['disease-configurator-select-destination-for-each-origin-checkboxes'];

                // clear the loop
                req.session.data['disease-configurator-select-destination-for-each-origin-checkboxes'] =  undefined;

                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // Save the submitted data for this loop
                var loopcounter = parseInt(req.session.data['origin-loop-counter']);

                // set up the output array if new
                if ( req.session.data['origin-destination-matrix'] == undefined)
                {
                    req.session.data['origin-destination-matrix'] = [];
                }

                req.session.data['origin-destination-matrix'][loopcounter]
                    = req.session.data['disease-configurator-select-destination-for-each-origin-checkboxes'];

                // Iterate through the loop unless from check answers
                let sizeofarray = req.session.data['disease-configurator-origin-types-checkboxes'].length;

                // Check if this is the final item in the list
                if ( sizeofarray == req.session.data['origin-loop-counter'] + 1 ) {
                    req.session.data['origin-showing-in-loop'] == undefined

                    // Go to the final page
                    res.redirect('cross-border-movements');
                }
                else
                {
                    // if the selected origin is undefined then we're not in the loop and need to begin
                    loopcounter = loopcounter + 1 ;
                    req.session.data['origin-loop-counter'] = loopcounter;

                    // set the first loop to the first item in the list
                    req.session.data['origin-showing-in-loop']
                        = req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][loopcounter];

                    res.redirect('select-destination-for-each-origin');
                }
            }
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////      CHanging disease matric from check answers   ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.get( section + 'change-matrix/:originindex', function (req, res)
    {
        req.session.data['origin-loop-counter'] = req.params.originindex;

        var loopcounter = parseInt(req.session.data['origin-loop-counter']);

        req.session.data['origin-showing-in-loop']
            = req.session.data['disease-configurator-origin-types-checkboxes-text-for-heading'][loopcounter];

        req.session.data['camefromcheckanswers'] = 'true';

        res.redirect('../select-destination-for-each-origin');
    })







        ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////      Border movements allowed under  licence       ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'cross-border-movements-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-cross-border-movements-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-cross-border-movements-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('cross-border-movements');
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
                res.redirect('check-answers');
            }
        }
    })




    router.post(section + 'disease-submit-router', function (req, res)
    {
        req.session.data['new-disease-added'] = 'true';

        const options = {
            day: 'numeric',   // e.g., 25
            month: 'long',    // e.g., July
            year: 'numeric'   // e.g., 2025
        };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(new Date());

        req.session.data['todays-date'] = formattedDate;

        res.redirect('confirmation');
    })




}
