const {log} = require("govuk-prototype-kit/migrator/logger");

let section = 'templates';
let sectionURL = '/' + 'templates' + '/';

module.exports = function (router)
{


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

    // 1. Change PAGENAME_RADIOS
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. OPTIONAL Change 'default_next_page' for any specific radio which changes the next page

    router.post( sectionURL + 'PAGENAME_RADIOS-router/:pageName/:radioOptions', function (req, res)
    {
        let default_next_page= 'THE_NEXT_PAGE_NAME';
        
        let page_name_submitted = req.params.pageName;
        let arrayOfRadioOptionsText = req.params.radioOptions.split(',');
        
        // Turn errors off by default
        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';

        // Radio 1
        if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[0] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 2
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[1] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 3
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[2] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 4
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[3] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 5
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[4] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 6
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[5] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 7
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[6] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 8
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[7] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 9
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[8] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // Radio 10
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[9] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        // The OR option at the bottom of the page
        else if ( req.session.data[ section + '-' + page_name_submitted + '-radios' ] == arrayOfRadioOptionsText[10] )
        {
            // Continue to the next page
            // If the user needs to go back to 'check your answers' then take them directly there
            if ( req.session.data['camefromcheckanswers'] == 'true' )
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../../' + default_next_page );
            }
        }

        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('../../' + page_name_submitted );
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
