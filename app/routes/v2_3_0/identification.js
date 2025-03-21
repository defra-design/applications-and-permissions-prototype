const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {

    /*
        Setting a version in each routes.js file
        This allows you to make new version of the prototype and have the old versions still work
        This is done by making a copy of the routes files and updating just this version variable for the new version
     */


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/create-application/identification/";



    // NOT COMPLEX PAGE
    router.get(section + 'start-identification-router', function (req, res)
    {
        res.redirect('any-calves');
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'any-calves-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['identification-any-calves-radios-yes-no'] == "Yes")
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
                res.redirect('oldest-calf-dob');
            }
        }
        else if (req.session.data['identification-any-calves-radios-yes-no'] == "No")
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
                res.redirect('enter-ear-tags-testing-dates');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('any-calves');
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


    router.post(section + 'oldest-calf-dob-router', function (req, res)
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


        res.redirect('enter-ear-tags-calves')

    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////   enter CALF ear tags - free text area for now      ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'enter-ear-tags-calves-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // Validation check if field is blank
        if (req.session.data['identification-enter-ear-tags-calves-text-input'] == undefined || req.session.data['identification-enter-ear-tags-calves-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('enter-ear-tags-calves');
        }

        else
        {
            res.redirect('any-cattle-over-42-days');
        }

    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Any cattle over 42 days                ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'any-cattle-over-42-days-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['identification-any-cattle-over-42-days-radios-yes-no'] == "Yes")
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
                res.redirect('enter-ear-tags-testing-dates');
            }
        }
        else if (req.session.data['identification-any-cattle-over-42-days-radios-yes-no'] == "No")
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
            res.redirect('any-cattle-over-42-days');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////           Adult cattle testing dates               ////////////////
    ////////////////             free text area for now                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'enter-ear-tags-testing-dates-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // Validation check if field is blank
        if (req.session.data['identification-enter-ear-tags-testing-dates-text-input'] == undefined || req.session.data['identification-enter-ear-tags-testing-dates-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('enter-ear-tags-testing-dates');
        }

        else
        {
            res.redirect('enter-ear-tags');
        }

    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    Adult cattle                    ////////////////
    ////////////////       enter ear tags - free text area for now      ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post(section + 'enter-ear-tags-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // Validation check if field is blank
        if (req.session.data['identification-enter-ear-tags-text-input'] == undefined || req.session.data['identification-enter-ear-tags-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('enter-ear-tags');
        }

        else
        {
            res.redirect('check-answers');
        }

    })

}
