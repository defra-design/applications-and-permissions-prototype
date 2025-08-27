const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {



    let section = "/exotics/fmd/";












    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    MOVEMENT TYPE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'about-the-movement-or-activity/type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-or-activity-type-radios'] == "Movement on to a farm or premises")
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
                res.redirect('what-is-moving');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-type-radios'] == "Movement off a farm or premises")
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
                res.redirect('what-is-moving');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-type-radios'] == "Slaughter of animals onsite")
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
                res.redirect('animal-being-slaughtered');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('type');
        }
    })














    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                What are you moving                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'about-the-movement-or-activity/what-is-moving-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Live animals")
        {
            // Continue to the next page

            // This page name needs to be the next page the user gets to after successfully continuing
            res.redirect('slaughter-yes-no');

        }
        else if (req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Carcasses")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['about-the-movement-or-activity-type-radios'] == "Movement on to a farm or premises")
            {
                res.redirect('movement-on-exit-page');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('animal-type');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Milk")
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['about-the-movement-or-activity-type-radios'] == "Movement on to a farm or premises")
            {
                res.redirect('movement-on-exit-page');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('animal-the-milk-is-from');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('what-is-moving');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Slaughter of live animals              ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'about-the-movement-or-activity/slaughter-yes-no-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-or-activity-slaughter-yes-no-radios-yes-no'] == "Yes")
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
                res.redirect('animal-type');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-slaughter-yes-no-radios-yes-no'] == "No")
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
                res.redirect('animal-type');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('slaughter-yes-no');
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


    router.post(section + 'about-the-movement-or-activity/animal-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-or-activity-animal-type-radios'] == "Cattle")
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
                res.redirect('number-of-animals');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-type-radios'] == "Sheep")
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
                res.redirect('number-of-animals');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-type-radios'] == "Goats")
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
                res.redirect('number-of-animals');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-type-radios'] == "Pigs")
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
                res.redirect('number-of-animals');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-type-radios'] == "Camelids")
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
                res.redirect('number-of-animals');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('animal-type');
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


    router.post(section + 'about-the-movement-or-activity/animal-the-milk-is-from-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-or-activity-animal-the-milk-is-from-radios'] == "Cow")
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
        else if (req.session.data['about-the-movement-or-activity-animal-the-milk-is-from-radios'] == "Sheep")
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
        else if (req.session.data['about-the-movement-or-activity-animal-the-milk-is-from-radios'] == "Goat")
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
        else if (req.session.data['about-the-movement-or-activity-animal-the-milk-is-from-radios'] == "Another animal")
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
            res.redirect('animal-the-milk-is-from');
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


    router.post(section + 'about-the-movement-or-activity/number-of-animals-router', function (req, res)
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
        if (req.session.data['about-the-movement-or-activity-number-of-animals-number-input'] == undefined || req.session.data['about-the-movement-or-activity-number-of-animals-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('number-of-animals');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['about-the-movement-or-activity-number-of-animals-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['about-the-movement-or-activity-number-of-animals-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('number-of-animals');
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
                    res.redirect('number-of-animals');
                }

                else if ( numberinputfloat < 1 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('number-of-animals');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['about-the-movement-or-activity-number-of-animals-number-input'] = numberinputfloat.toLocaleString();


                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('check-answers');
                    }
                    else
                    {
                        // This page name needs to be the next page the user gets to after successfully continuing
                        res.redirect('id-number');
                    }
                }
            }

        }

    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT AREA - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'about-the-movement-or-activity/id-number-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['about-the-movement-or-activity-id-number-text-input'] == undefined || req.session.data['about-the-movement-or-activity-id-number-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('id-number');
        }

        else if (req.session.data['about-the-movement-or-activity-id-number-text-input'].length > 5000)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('id-number');
        }

        else
        {

            // everything with the input is fine so move on to next page

            res.redirect('check-answers');

        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         Animal type being slughtered               ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'about-the-movement-or-activity/animal-being-slaughtered-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['about-the-movement-or-activity-animal-being-slaughtered-radios'] == "Cattle")
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
                res.redirect('number-of-animals-slaughtered');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-being-slaughtered-radios'] == "Sheep")
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
                res.redirect('number-of-animals-slaughtered');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-being-slaughtered-radios'] == "Goats")
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
                res.redirect('number-of-animals-slaughtered');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-being-slaughtered-radios'] == "Pigs")
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
                res.redirect('number-of-animals-slaughtered');
            }
        }
        else if (req.session.data['about-the-movement-or-activity-animal-being-slaughtered-radios'] == "Camelids")
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
                res.redirect('number-of-animals-slaughtered');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('animal-being-slaughtered');
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


    router.post(section + 'about-the-movement-or-activity/number-of-animals-slaughtered-router', function (req, res)
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
        if (req.session.data['about-the-movement-or-activity-number-of-animals-slaughtered-number-input'] == undefined || req.session.data['about-the-movement-or-activity-number-of-animals-slaughtered-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('number-of-animals-slaughtered');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['about-the-movement-or-activity-number-of-animals-slaughtered-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['about-the-movement-or-activity-number-of-animals-slaughtered-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('number-of-animals-slaughtered');
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
                    res.redirect('number-of-animals-slaughtered');
                }

                else if ( numberinputfloat < 1 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('number-of-animals-slaughtered');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['about-the-movement-or-activity-number-of-animals-slaughtered-number-input'] = numberinputfloat.toLocaleString();

                    res.redirect('id-number');
                }
            }

        }

    })

















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                MOVEMENT ORIGIN                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////








    router.get(section + 'movement-origin/start-section', function (req, res)
    {
        //  IF moving a Milk onto premises
        if (req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Milk")
        {
            res.redirect('premises-type');
        }
        else
        {
            res.redirect('TLA-yes-no');
        }
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////              TLA  yes or no                        ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'movement-origin/tla-yes-no-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['movement-origin-tla-yes-no-radios-yes-no'] == "Yes")
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
                res.redirect('tla-or-tcph-number');
            }
        }
        else if (req.session.data['movement-origin-tla-yes-no-radios-yes-no'] == "No")
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
                res.redirect('premises-type');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('tla-yes-no');
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'movement-origin/tla-or-tcph-number-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['movement-origin-tla-or-tcph-number-text-input'] == undefined || req.session.data['movement-origin-tla-or-tcph-number-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('tla-or-tcph-number');
        }



        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['about-the-movement-or-activity-type-radios'] == "Slaughter of animals onsite"   ||
                req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Carcasses")
            {
                res.redirect('grid-reference');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('animals-kept-on-premises');
            }

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


    router.post(section + 'movement-origin/premises-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['movement-origin-premises-type-radios'] == "Farm")
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
                res.redirect('cph-number');
            }
        }
        else if (req.session.data['movement-origin-premises-type-radios'] == "Commercial holding or premises")
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
                res.redirect('cph-number');
            }
        }
        else if (req.session.data['movement-origin-premises-type-radios'] == "Smallholding or domestic residence")
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
                res.redirect('cph-number');
            }
        }
        else if (req.session.data['movement-origin-premises-type-radios'] == "Another location")
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
                res.redirect('cph-number');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('premises-type');
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
    router.post( section + 'movement-origin/cph-number-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";

        // Validation check if field is blank
        if (req.session.data['movement-origin-cph-number-text-input'] == undefined || req.session.data['movement-origin-cph-number-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('cph-number');
        }
        else
        {
            let regexpattern = /^(\d{2})\/(\d{3})\/(\d{4})$/;
            let cphentered = req.session.data['movement-origin-cph-number-text-input'];
            let cphnospaces = cphentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('cph-number');
            }
            else
            {
                res.redirect('address');
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
    router.post( section + 'movement-origin/address-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if line 1 field is blank
        if (req.session.data['fmd-movement-origin-address-line-1'] == undefined || req.session.data['fmd-movement-origin-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('address');
        }
        // Validation check if town field is blank
        else if (req.session.data['fmd-movement-origin-address-town'] == undefined || req.session.data['fmd-movement-origin-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('address');
        }

        // Validation check if postcode field is blank
        else if (req.session.data['fmd-movement-origin-address-postcode'] == undefined || req.session.data['fmd-movement-origin-address-postcode'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('address');
        }
        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let addressentered = req.session.data['fmd-movement-origin-address-postcode'];
            let cphnospaces = addressentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('address');
            }
            else
            {
                //  IF moving a Milk onto premises
                if (req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Milk")
                {
                    res.redirect('check-answers');
                }
                else
                {
                    res.redirect('designated-premises');
                }

            }
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


    router.post(section + 'movement-origin/designated-premises-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['fmd-origin-designated-premises-radios-yes-no'] == "Yes"  ||
            req.session.data['fmd-origin-designated-premises-radios-yes-no'] == "No"   ||
            req.session.data['fmd-origin-designated-premises-radios-yes-no'] == "I don't know"
        )
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['about-the-movement-or-activity-type-radios'] == "Slaughter of animals onsite"   ||
                req.session.data['about-the-movement-or-activity-what-is-moving-radios'] == "Carcasses")
            {
                res.redirect('grid-reference');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('animals-kept-on-premises');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('designated-premises');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////              grid reference                       ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'movement-origin/grid-reference-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['movement-origin-grid-reference-text-input'] == undefined || req.session.data['movement-origin-grid-reference-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('grid-reference');
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
                res.redirect('animals-kept-on-premises');
            }

        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Animals kept on origin                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'movement-origin/animals-kept-on-premises-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['movement-origin-animals-kept-on-premises-checkboxes'] == undefined  ||
            req.session.data['movement-origin-animals-kept-on-premises-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('animals-kept-on-premises');
        }

        else
        {
            // Continue to the next page
            let originalStringequipment = String(req.session.data['movement-origin-animals-kept-on-premises-checkboxes']);
            let newStringequipment = originalStringequipment.replace(/,(?!\s)/g, "\n\n");

            if(newStringequipment == "undefined")
            {
                req.session.data['movement-origin-animals-kept-on-premises-checkboxes-formatted'] = "None";
            }
            else
            {
                req.session.data['movement-origin-animals-kept-on-premises-checkboxes-formatted'] = newStringequipment;
            }

            // If the user needs to go back to 'check your answers' then take them directly there
            if (newStringequipment.includes("Other cloven-hooved animals"))
            {
                res.redirect('cloven-hooved-animals');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             other cloven hooved animals            ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'movement-origin/cloven-hooved-animals-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['origin-designated-cloven-hooved-animals-text-input'] == undefined || req.session.data['origin-designated-cloven-hooved-animals-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('cloven-hooved-animals');
        }
        else
        {
            res.redirect('check-answers');
        }
    })










}
