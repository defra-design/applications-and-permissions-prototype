let section = 'templates';
let sectionURL = '/' + 'templates' + '/';

module.exports = function (router)
{


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////             MONEY ENTRY - MANDATORY                ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_MONEY
    // 2. Change THE_NEXT_PAGE_NAME

    router.post( sectionURL + 'PAGENAME_MONEY-router/:pageName/:allowZero/:highestNumber', function (req, res)
    {
        let page_name_submitted = req.params.pageName;
        let allow_zero_submitted = req.params.allowZero;
        let highest_number_submitted = req.params.highestNumber;

        let highest_number_submitted_without_comma = highest_number_submitted.replace(/,/g, '');
        let highestNumberIsNumber = isNaN(highest_number_submitted_without_comma) == false;
        var highest_number_submitted_float = null;
        if (highestNumberIsNumber)
        {
            highest_number_submitted_float = parseFloat(highest_number_submitted_without_comma);
        }


        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';
        req.session.data['errortypefive'] = 'false';


        // Validation check if field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-money-input' ] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-money-input' ] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }
        else
        {
            // Make any entered or existing amount have no commas
            let nocommasinput = req.session.data[ section + '-' + page_name_submitted + '-money-input' ].replace(/,/g, '');
            let nocommasinputfloat = parseFloat(req.session.data[ section + '-' + page_name_submitted + '-money-input' ].replace(/,/g, ''));

            // if not a number throw first error
            if( isNaN( nocommasinput ) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypetwo'] = 'true';

                // This page name needs to match the page the user was just on
                res.redirect( '../../../' + page_name_submitted );
            }
            else
            {
                // make numbers to 2 decimal places and add in commas, also adds £ symbol
                let tempnumber = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP'}).format( nocommasinputfloat );

                // Remove pound symbol
                let moneyformatted = tempnumber.replace(/\u00A3/g, '');
                req.session.data[ section + '-' + page_name_submitted + '-money-input' ] = moneyformatted;


                // if the number is too large
                // Set this number for your context
                if ( highestNumberIsNumber &&
                    highest_number_submitted_float < nocommasinputfloat )
                {
                    // Trigger validation and relaunch the page for amount lower than 50
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypethree'] = 'true';

                    // This page name needs to match the page the user was just on
                    res.redirect( '../../../' + page_name_submitted );
                }

                // if the number is 0 or less
                else if (  allow_zero_submitted == 'false'  &&
                           nocommasinputfloat <= 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypefour'] = 'true';

                    // This page name needs to match the page the user was just on
                    res.redirect( '../../../' + page_name_submitted );
                }

                else
                {
                    // This number would be in the session from where a suer has entered it on a proceeding page
                    req.session.data['madeupamount'] = '10,000,000.00';
                    let anotheramount = parseFloat(req.session.data['madeupamount'].replace(/,/g, ''));

                    // if the number is larger than the user entered on a previous section when it can't be.
                    // e.g. Income tax must be less than income amount
                    if ( anotheramount < nocommasinputfloat )
                    {
                        // Trigger validation and relaunch the page for number larger than the user entered on a previous section
                        req.session.data['errorthispage'] = 'true';
                        req.session.data['errortypefive'] = 'true';

                        // This page name needs to match the page the user was just on
                        res.redirect( '../../../' + page_name_submitted );
                    }


                    // everything with the input is fine so move on to next page
                    else
                    {
                        // Save a separate bit of session data which shows the amount with the pound sign
                        req.session.data[ section + '-' + page_name_submitted + '-money-input-with-pound-sign'] = '£' + moneyformatted;

                        // If the user needs to go back to 'check your answers' then take them directly there
                        if (req.session.data['camefromcheckanswers'] == 'true')
                        {
                            req.session.data['camefromcheckanswers'] = false;
                            res.redirect( '../../../' + 'check-answers' );
                        }
                        else
                        {
                            // This page name needs to be the next page the user gets to after successfully continuing
                            res.redirect( '../../../' + 'THE_NEXT_PAGE_NAME' );
                        }
                    }
                }

            }

        }

    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////             MONEY ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////



}
