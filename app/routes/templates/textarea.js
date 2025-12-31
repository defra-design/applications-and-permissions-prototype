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
    ////////////////              TEXT AREA - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_TEXTAREA
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Remove the checks below for checking length of the input text and invalid characters.

    router.post( sectionURL + 'PAGENAME_TEXTAREA-router/:pageName/:lowestNumber/:highestNumber', function (req, res)
    {
        let page_name_submitted = req.params.pageName;
        let lowest_number_submitted = req.params.lowestNumber;
        let highest_number_submitted = req.params.highestNumber;

        let lowest_number_submitted_without_comma = lowest_number_submitted.replace(/,/g, '');
        let lowestNumberIsNumber = isNaN(lowest_number_submitted_without_comma) == false;
        var lowest_number_submitted_float = null;
        if (lowestNumberIsNumber)
        {
            lowest_number_submitted_float = parseFloat(lowest_number_submitted_without_comma);
        }

        let highest_number_submitted_without_comma = highest_number_submitted.replace(/,/g, '');
        let highestNumberIsNumber = isNaN(highest_number_submitted_without_comma) == false;
        var highest_number_submitted_float = null;
        if (highestNumberIsNumber)
        {
            highest_number_submitted_float = parseFloat(highest_number_submitted_without_comma);
        }


        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";


        // Validation check if field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        // Input too long
        else if ( highestNumberIsNumber &&
                  highest_number_submitted_float < req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ].length )
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        // Input too short
        else if ( lowestNumberIsNumber &&
                  req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ].length < lowest_number_submitted_float )
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        else
        {
            // check no illegal characters have been used
            const acceptableCharacters =  " abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&:’\,.()-\n\r\n";
            let inputtext = req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ];

            let dissallowedCharacters = "";

            // go through every character in the input and save  illegals ones
            for (var i = 0; i < inputtext.length; i++)
            {
                let  singlecharacter = inputtext.charAt(i);

                if( acceptableCharacters.includes( singlecharacter ) )
                {
                    // character is fine skip it
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
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefour'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect( '../../../' + page_name_submitted );
            }
            else
            {
                // everything with the input is fine so move on to next page

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
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////              TEXT AREA - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////



}
