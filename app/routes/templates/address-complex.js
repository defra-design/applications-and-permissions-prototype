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
    ////////////////            ADDRESS - 3 MANDATORY FIELDS            ////////////////
    ////////////////                   COMPLEX PAGE                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_ADDRESS_COMPLEX
    // 2. Change THE_NEXT_PAGE_NAME

    // NOT COMPLEX PAGE
    router.post( sectionURL + 'PAGENAME_ADDRESS_COMPLEX-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if line 1 field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-address-line-1'] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }

        // Validation check if town field is blank
        else if (req.session.data[ section + '-' + page_name_submitted + '-address-town'] == undefined ||
                 req.session.data[ section + '-' + page_name_submitted + '-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }

        // Validation check if postcode field is blank
        else if (req.session.data[ section + '-' + page_name_submitted + '-address-postcode'] == undefined ||
                 req.session.data[ section + '-' + page_name_submitted + '-address-postcode'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }

        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let addressentered = req.session.data[ section + '-' + page_name_submitted + '-address-postcode'];
            let cphnospaces = addressentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect( '../' + page_name_submitted );
            }
            else
            {
                //  IF moving a Milk onto premises
                if ( req.session.data['camefromcheckanswers'] == 'true' )
                {
                    req.session.data['camefromcheckanswers'] = false;
                    res.redirect( '../' + 'check-answers' );
                }
                else
                {
                    res.redirect( '../' + 'THE_NEXT_PAGE_NAME' );
                }

            }
        }

    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////            ADDRESS - 3 MANDATORY FIELDS            ////////////////
    ////////////////                    COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////



    

}
