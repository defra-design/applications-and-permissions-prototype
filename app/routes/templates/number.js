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
    ////////////////                 NUMBER ENTRY                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_NUMBER
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Remove the checks below for checking the size of the input number and invalid characters.

    router.post(sectionURL + 'PAGENAME_NUMBER-router/:pageName/:allowZero/:lowestNumber/:highestNumber', function (req, res)
    {
        let page_name_submitted = req.params.pageName;
        let allow_zero_submitted = req.params.allowZero;
        let lowest_number_submitted = req.params.lowestNumber;
        let highest_number_submitted = req.params.highestNumber;


        let lowestNumberIsNumber = isNaN(lowest_number_submitted) == false;
        var lowest_number_submitted_float = null;
        if (lowestNumberIsNumber)
        {
            lowest_number_submitted_float = parseFloat(lowest_number_submitted);
        }

        let highestNumberIsNumber = isNaN(highest_number_submitted) == false;
        var highest_number_submitted_float = null;
        if (highestNumberIsNumber)
        {
            highest_number_submitted_float = parseFloat(highest_number_submitted);
        }


        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";


        // Validation check if field is blank
        if (req.session.data[section + '-' + page_name_submitted + '-number-input'] == undefined ||
            req.session.data[section + '-' + page_name_submitted + '-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('../../../../' + page_name_submitted);
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data[section + '-' + page_name_submitted + '-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data[section + '-' + page_name_submitted + '-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('../../../../' + page_name_submitted);
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
                    res.redirect('../../../../' + page_name_submitted);
                }

                else if ( allow_zero_submitted == 'false'  &&  numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number being 0
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('../../../../' + page_name_submitted);
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 0
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('../../../../' + page_name_submitted);
                }

                else if ( lowest_number_submitted_float != null &&
                          highest_number_submitted_float != null &&
                          ( numberinputfloat < lowest_number_submitted_float  ||
                            highest_number_submitted_float < numberinputfloat )
                        )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeseven'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('../../../../' + page_name_submitted);
                }

                else if ( lowest_number_submitted_float != null &&
                          numberinputfloat < lowest_number_submitted_float   )
                {
                    // Trigger validation and relaunch the page for number lower than 3
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('../../../../' + page_name_submitted);
                }

                else if ( highest_number_submitted_float != null &&
                          highest_number_submitted_float < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data[section + '-' + page_name_submitted + '-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('../../../../' + page_name_submitted);
                }

                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data[section + '-' + page_name_submitted + '-number-input'] = numberinputfloat.toLocaleString();


                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('../../../../' + 'check-answers');
                    }
                    else
                    {
                        // This page name needs to be the next page the user gets to after successfully continuing
                        res.redirect('../../../../' + 'THE_NEXT_PAGE_NAME');
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
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
