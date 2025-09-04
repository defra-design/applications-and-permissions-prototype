const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "/templates/";

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



    // COMPLEX PAGE
    router.post( section + 'PAGENAME_ADDRESS_COMPLEX-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if line 1 field is blank
        if (req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-line-1'] == undefined || req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( 'PAGENAME_ADDRESS_COMPLEX' );
        }

        // Validation check if town field is blank
        else if (req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-town'] == undefined || req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-town'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( 'PAGENAME_ADDRESS_COMPLEX' );
        }

        // Validation check if postcode field is blank
        else if (req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-postcode'] == undefined || req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-postcode'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( 'PAGENAME_ADDRESS_COMPLEX' );
        }

        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let addressentered = req.session.data['SECTION-PAGENAME_ADDRESS_COMPLEX-address-postcode'];
            let cphnospaces = addressentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect( 'PAGENAME_ADDRESS_COMPLEX' );
            }
            else
            {
                //  IF moving a Milk onto premises
                if ( req.session.data['camefromcheckanswers'] == 'true' )
                {
                    req.session.data['camefromcheckanswers'] = false;
                    res.redirect( 'check-answers' );
                }
                else
                {
                    res.redirect( 'THE_NEXT_PAGE_NAME' );
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
