const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {




    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */

    let section  = "disease-configurator";
    let section_general_licence  = "disease-configurator-general-licence";
    let sectionURL = "/" + "all-diseases/disease-configurator" + "/";






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
    router.get(sectionURL + 'routing-exotics-configurator-start', function (req, res)
    {
        // Continue to the next pages where farmer is the origin
        res.redirect('task-list');
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


    router.post(sectionURL + 'about-the-disease/disease-name-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['disease-configurator-disease-name-text-input'] == undefined || req.session.data['disease-configurator-disease-name-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('disease-name');
        }

        else if (req.session.data['disease-configurator-disease-name-text-input'].length >100)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('disease-name');
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
                res.redirect('vaccine');
            }

        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                  Vaccine Yes or No                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'about-the-disease/vaccine-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['disease-configurator-vaccine-radios-yes-no'] == "Yes")
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
                res.redirect('gis-data');
            }
        }
        else if (req.session.data['disease-configurator-vaccine-radios-yes-no'] == "No")
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
                res.redirect('gis-data');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('vaccine');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                GIS mapping data                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'about-the-disease/gis-data-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['disease-configurator-gis-data-radios'] == "Avian influenza")
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
                res.redirect('transmission-pathways');
            }
        }
        else if (req.session.data['disease-configurator-gis-data-radios'] == "Bluetongue virus (BTV)")
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
                res.redirect('transmission-pathways');
            }
        }
        else if (req.session.data['disease-configurator-gis-data-radios'] == "Tuboculosis (TB)")
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
                res.redirect('transmission-pathways');
            }
        }
        else if (req.session.data['disease-configurator-gis-data-radios'] == "None of the above")
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
                res.redirect('transmission-pathways');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('gis-data');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Transmission pathways                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'about-the-disease/transmission-pathways-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-transmission-pathways-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-transmission-pathways-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('transmission-pathways');
        }
        else
        {
            // Make formatted text for check answer review page
            checkboxestext = req.session.data['disease-configurator-transmission-pathways-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data['disease-configurator-transmission-pathways-checkboxes-formatted'] = newStringmanure;


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
                res.redirect('biosecurity-level');
            }
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                Biosecurity level                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'about-the-disease/biosecurity-level-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['disease-configurator-biosecurity-level-radios'] == "The person responsible for the premises")
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
        else if (req.session.data['disease-configurator-biosecurity-level-radios'] == "APHA vets")
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
        else if (req.session.data['disease-configurator-biosecurity-level-radios'] == "Private vets")
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
        else if (req.session.data['disease-configurator-biosecurity-level-radios'] == "Someone else")
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
            res.redirect('PAGENAME_RADIOS');
        }
    })





































    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    //                              GENERAL LICENCES

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////           Are there any general licences           ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_YES_NO_COMPLEX
    // 2. Change THE_NEXT_PAGE_NAME

    router.post(sectionURL + 'general-licences/any-general-licences-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data[section_general_licence + '-' + page_name_submitted + '-radios-yes-no'] == "Yes")
        {
            // Continue to the next page
            req.session.data['camefromcheckanswers'] = false;
            // If the user needs to go back to 'check your answers' then take them directly there

            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('../' + 'types-of-movement');

        }
        else if (req.session.data[section_general_licence + '-' + page_name_submitted + '-radios-yes-no'] == "No")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../' + 'check-answers');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         Types of movement on or off etc            ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'general-licences/types-of-movement-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

        // check if none of the checkboxes are selected
        if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
        }

        else
        {
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;


            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                res.redirect('../' + 'things-covered-by-general-licences');
            }
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////          Things covered by general licence         ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'general-licences/things-covered-by-general-licences-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

        // check if none of the checkboxes are selected
        if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
           req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
        }

        else
        {
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;


            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there

            if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].includes("Animals") )
            {
                res.redirect('../' + 'animals-under-general-licences');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                res.redirect('../' + 'origin-types-general-licences');
            }
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     Select animals covered by general licences     ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    router.post(sectionURL + 'general-licences/animals-under-general-licences-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        // check if none of the checkboxes are selected
        if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
        }

        else
        {
            // Make formatted text for check answer review page
            let checkboxestext = "";
            checkboxestext = req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;


            // Continue to the next page
            if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].includes("PLACEHOLDER_CHECKBOX_TEXT") )
            {
                res.redirect('../' + 'CONDITONAL_NEXT_PAGE_NAME');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                // If the user needs to go back to 'check your answers' then take them directly there
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                res.redirect('../' + 'origin-types-general-licences');
            }
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        Selecting all the relevant origins          ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    router.post(sectionURL + 'general-licences/origin-types-general-licences-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

        // check if none of the checkboxes are selected
        if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
        }

        else
        {
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;


            // format the text in a new array to fit in the question for the matrix
            req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'] = [];
            const vowels = 'aeiou';

            for (let i = 0; i < req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].length; i++) {
                // Convert the item at the current index to lower case
                req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][i]
                    = req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'][i].toString().toLowerCase();

                var firstLetter = req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][i].toString()[0].toLowerCase();


                if (vowels.includes(firstLetter))
                {
                    // If it is a vowel, add "an " to the front of the word
                    req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][i] = "an " + req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][i];
                }
                else
                {
                    req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][i] = "a " + req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][i];
                }
            }


            // Continue to the next page
            if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].includes("PLACEHOLDER_CHECKBOX_TEXT") )
            {
                res.redirect('../' + 'CONDITONAL_NEXT_PAGE_NAME');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                // If the user needs to go back to 'check your answers' then take them directly there
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                res.redirect('../' + 'destination-types-general-licences');
            }
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     Destination types for general licences         ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    router.post(sectionURL + 'general-licences/destination-types-general-licences-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

        // check if none of the checkboxes are selected
        if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
        }

        else
        {
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;


            // Continue to the next page
            if(req.session.data[section_general_licence + '-' + page_name_submitted + '-checkboxes'].includes("PLACEHOLDER_CHECKBOX_TEXT") )
            {
                res.redirect('../' + 'CONDITONAL_NEXT_PAGE_NAME');
            }
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                // If the user needs to go back to 'check your answers' then take them directly there
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                // Count things for the loop
                if (req.session.data['origin-general-licence-showing-in-loop'] == undefined)
                {
                    // if the selected origin is undefined then we're not in the loop and need to begin
                    let loopcounter = 0;

                    req.session.data['origin-general-licence-loop-counter'] = loopcounter;

                    // set the first loop to the first item in the list
                    req.session.data['origin-general-licence-showing-in-loop']
                        = req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][loopcounter];
                }

                res.redirect('../' + 'select-destination-for-each-origin-general-licences');
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


    router.post(sectionURL + 'general-licences/select-destination-for-each-origin-general-licences-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        // check if none of the checkboxes are selected
        if(req.session.data[section_general_licence + '-' + 'select-destination-for-each-origin-general-licences-checkboxes'] == undefined  ||
            req.session.data[section_general_licence + '-' + 'select-destination-for-each-origin-general-licences-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('select-destination-for-each-origin-general-licences');
        }

        else
        {
            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                // save the answers for the specific index changed
                var loopcounter = parseInt(req.session.data['origin-general-licence-loop-counter']);
                req.session.data['origin-destination-matrix-general-licences'][loopcounter]
                    = req.session.data[section_general_licence + '-' + 'select-destination-for-each-origin-general-licences-checkboxes'];

                // clear the loop
                req.session.data[section_general_licence + '-' + 'select-destination-for-each-origin-general-licences-checkboxes'] =  undefined;

                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                // Save the submitted data for this loop
                var loopcounter = parseInt(req.session.data['origin-general-licence-loop-counter']);

                // set up the output array if new
                if ( req.session.data['origin-destination-matrix-general-licences'] == undefined)
                {
                    req.session.data['origin-destination-matrix-general-licences'] = [];
                }

                req.session.data['origin-destination-matrix-general-licences'][loopcounter]
                    = req.session.data[section_general_licence + '-' + 'select-destination-for-each-origin-general-licences-checkboxes'];

                // Iterate through the loop unless from check answers
                let sizeofarray = req.session.data[section_general_licence + '-' + 'origin-types-general-licences-checkboxes'].length;

                // Check if this is the final item in the list
                if ( sizeofarray == req.session.data['origin-general-licence-loop-counter'] + 1 ) {
                    req.session.data['origin-showing-in-loop-general-licences'] == undefined

                    // Go to the final page
                    res.redirect('check-answers');
                }
                else
                {
                    // if the selected origin is undefined then we're not in the loop and need to begin
                    loopcounter = loopcounter + 1 ;
                    req.session.data['origin-general-licence-loop-counter'] = loopcounter;

                    // set the first loop to the first item in the list
                    req.session.data['origin-general-licence-showing-in-loop']
                        = req.session.data[section_general_licence + '-' + 'origin-types-checkboxes-text-for-general-licences-headings'][loopcounter];

                    res.redirect('select-destination-for-each-origin-general-licences');
                }
            }
        }
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


    router.post(sectionURL + 'devolved-administrations/devolved-administrations-list-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

        // check if none of the checkboxes are selected
        if(req.session.data['disease-configurator-devolved-administrations-list-checkboxes'] == undefined  ||
            req.session.data['disease-configurator-devolved-administrations-list-checkboxes'].length == 0)
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
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section + '-' + 'devolved-administrations-list' + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section + '-' + 'devolved-administrations-list' + '-checkboxes-formatted'] = newStringmanure;

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




























































































    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // OLD STUFF

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


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
                ];

                req.session.data['disease-configurator-scope-of-things-animals-checkboxes'] =
                    [
                        "Cattle",
                        "Sheep",
                        "Goats",
                        "Pigs",
                        "Birds",
                        "Horses",
                        "Deer",
                        "Llamas",
                        "Alpacas",
                        "Camels",
                        "Buffalo",
                        "Rabbits",
                        "Fish",
                        "Snails"
                    ];

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
            req.session.data['disease-configurator-scope-of-things-animals-checkboxes'] =
                [
                    "Cattle",
                    "Sheep",
                    "Goats",
                    "Pigs",
                    "Birds",
                    "Horses",
                    "Deer",
                    "Llamas",
                    "Alpacas",
                    "Camels",
                    "Buffalo",
                    "Rabbits",
                    "Fish",
                    "Snails"
                ];

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
