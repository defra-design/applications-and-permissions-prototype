const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "/templates/";

module.exports = function (router)
{

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                 NUMBER ENTRY                       ////////////////
    ////////////////                 COMPLEX PAGE                       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'PAGENAME_NUMBER_COMPLEX-router', function (req, res)
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
        if (req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] == undefined || req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_NUMBER_COMPLEX');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_NUMBER_COMPLEX');
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
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 3 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( 13 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 5  ||  8 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeseven'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] = numberinputfloat.toLocaleString();


                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('check-answers');
                    }
                    else
                    {
                        // This page name needs to be the next page the user gets to after successfully continuing
                        res.redirect('THE_NEXT_PAGE_NAME');
                    }
                }
            }

        }

    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////                  NUMBER ENTRY                      ////////////////
    ////////////////                  COMPLEX PAGE                      ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
