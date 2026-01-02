const {log} = require('govuk-prototype-kit/migrator/logger');

let section = 'templates';
let sectionURL = '/' + 'templates' + '/';

module.exports = function (router)
{

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

    // 1. Change PAGENAME_YES_NO
    // 2. Change THE_NEXT_PAGE_NAME for Yes and No

    router.post( sectionURL + 'PAGENAME_YES_NO-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';

        // If Yes was selected, continue to next page
        if (req.session.data[ section + '-' + page_name_submitted + '-radios-yes-no'] == 'Yes')
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
                res.redirect( '../' + 'THE_NEXT_PAGE_NAME' );
            }
        }
        else if (req.session.data[ section + '-' + page_name_submitted + '-radios-yes-no'] == 'No')
        {
            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect( '../' + 'check-answers' );
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect( '../' + 'THE_NEXT_PAGE_NAME' );
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            res.redirect( '../' + page_name_submitted );
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


}
