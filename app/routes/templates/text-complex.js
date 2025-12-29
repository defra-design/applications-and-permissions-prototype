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
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                   COMPLEX PAGE                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_TEXT_COMPLEX
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Remove the checks below for checking length of the input text and invalid characters.

    router.post(sectionURL + 'PAGENAME_TEXT_COMPLEX-router/:pageName/:lowestNumber/:highestNumber', function (req, res)
    {
        let page_name_submitted = req.params.pageName;
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

        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';

        // Validation check if the field is blank
        if (req.session.data[section + '-' + page_name_submitted + '-text-input'] == undefined ||
            req.session.data[section + '-' + page_name_submitted + '-text-input'] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect('../../../' + page_name_submitted);
        }

        // Input too long
        else if ( highest_number_submitted_float != null &&
                  highest_number_submitted_float < req.session.data[section + '-' + page_name_submitted + '-text-input'].length )
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypetwo'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect('../../../' + page_name_submitted);
        }

        // Input too short
        else if ( lowest_number_submitted_float != null &&
                  req.session.data[section + '-' + page_name_submitted + '-text-input'].length < lowest_number_submitted_float   )
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypethree'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect('../../../' + page_name_submitted);
        }

        else
        {
            // check no illegal charcters have been used
            const acceptableCharacters =  " abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&:’\,.()-";
            let inputtext = req.session.data[section + '-' + page_name_submitted + '-text-input'];

            let dissallowedCharacters = '';

            // go through every character in the input and save  illegals ones
            for (var i = 0; i < inputtext.length; i++)
            {
                let  singlecharacter = inputtext.charAt(i);

                if( acceptableCharacters.includes( singlecharacter ) )
                {
                    // character is fine, so skip it
                }
                else
                {
                    // save this invalid character
                    // if character is alread in tsring then don't add it
                    if( dissallowedCharacters.includes( singlecharacter ) == false )
                    {
                        dissallowedCharacters = dissallowedCharacters.concat(singlecharacter);
                    }
                }
            }

            if(0 < dissallowedCharacters.length)
            {
                req.session.data['dissallowedcharacters'] = dissallowedCharacters;

                // Trigger validation and relaunch the page for invalid characters
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypefour'] = 'true';

                // This page name needs to match the page the user was just on
                res.redirect('../../../' + page_name_submitted);
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
                    res.redirect('../../../' + 'THE_NEXT_PAGE_NAME');
                }
            }
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                    COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


}
