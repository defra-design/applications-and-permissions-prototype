let section = 'case-management';
let sectionURL = '/' + 'case-management' + '/';

module.exports = function (router) {


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////         select and upload licence document         ////////////////
    ////////////////                                                    ////////////////
    ////////////////            RADIO BUTTONS - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////



    router.post( sectionURL + 'issued-licence/upload-licence-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';

        // If file was not selected, reload page with error
        if (req.session.data[ section + '-' + page_name_submitted + '-file-upload'] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-file-upload'] == '')
        {
            // Trigger validation
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // Reload the page
            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }
        else
        {
            // Continue to the next page
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect( '../' + 'check-answers' );
            }
            else
            {
                req.session.data['state'] = 'Licence issued';

                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect( '../' + 'upload-licence-confirmation' );
            }
        }
    })






    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               CPH SEARCH RESULTS                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_TEXT
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Remove the checks below for invalid characters.

    router.post( sectionURL + 'search/cph-router/:pageName/:lowestNumber/:highestNumber', function (req, res)
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


        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';

        // Validation check if the field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-text-input' ] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-text-input' ] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            req.session.data['show-search-cph-results'] = 'false';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }


        else
        {
            let regexpattern = /^(\d{2})\/(\d{3})\/(\d{4})$/;
            let cphentered = req.session.data[ section + '-' + page_name_submitted + '-text-input' ];
            let cphnospaces = cphentered.trim();
            let result = regexpattern.test(cphnospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                req.session.data['show-search-cph-results'] = 'false';

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
                    req.session.data['show-search-cph-results'] = 'true';
                    res.redirect( '../../../' + page_name_submitted );
                }
            }
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////              EMAIL SEARCH RESULTS                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post( sectionURL + 'search/email-router/:pageName/:lowestNumber/:highestNumber', function (req, res)
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


        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';

        // Validation check if the field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-text-input' ] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-text-input' ] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            req.session.data['show-search-email-results'] = 'false';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        else
        {
            let regexpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
            let emailentered = req.session.data[ section + '-' + page_name_submitted + '-text-input' ];
            let result = regexpattern.test(emailentered);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                req.session.data['show-search-email-results'] = 'false';

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
                    req.session.data['show-search-email-results'] = 'true';
                    res.redirect( '../../../' + page_name_submitted );
                }
            }
        }
    })













    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             POSTCODE SEARCH RESULTS                ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT ENTRY - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post( sectionURL + 'search/postcode-router/:pageName/:lowestNumber/:highestNumber', function (req, res)
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


        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';

        // Validation check if the field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-text-input' ] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-text-input' ] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            req.session.data['show-search-postcode-results'] = 'false';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        else
        {
            let regexpattern = /^[a-zA-Z]{1,2}[0-9][a-zA-Z0-9]?\s?[0-9][a-zA-Z]{2}$/;
            let postcodeentered = req.session.data[ section + '-' + page_name_submitted + '-text-input' ];
            let postcodenospaces = postcodeentered.trim();
            let result = regexpattern.test(postcodenospaces);
            if (result == false)
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                req.session.data['show-search-postcode-results'] = 'false';

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
                    req.session.data['show-search-postcode-results'] = 'true';
                    res.redirect( '../../../' + page_name_submitted );
                }
            }
        }
    })














     ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               Add note to case                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////              TEXT AREA - MANDATORY                 ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_TEXTAREA
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Remove the checks below for checking length of the input text and invalid characters.

    router.post( sectionURL + 'add-note-router/:pageName/:lowestNumber/:highestNumber', function (req, res)
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


        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';


        // Validation check if field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        // Input too long
        else if ( highestNumberIsNumber &&
                  highest_number_submitted_float < req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ].length )
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypetwo'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        // Input too short
        else if ( lowestNumberIsNumber &&
                  req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ].length < lowest_number_submitted_float )
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypethree'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../../../' + page_name_submitted );
        }

        else
        {
            // check no illegal characters have been used
            const acceptableCharacters =  " abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&:’\,.()-\n\r\n";
            let inputtext = req.session.data[ section + '-' + page_name_submitted + '-text-area-input' ];

            let dissallowedCharacters = '';

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
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypefour'] = 'true';

                // This page name needs to match the page the user was just on
                res.redirect( '../../../' + page_name_submitted );
            }
            else
            {
                req.session.data['note-added'] = true;

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
                    res.redirect( '../../../' + 'application-details' );
                }
            }
        }
    })








    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               Staff name search                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////            COUNTRY ENTRY - MANDATORY               ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////



    router.post( sectionURL + 'search/staff-name-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';

        // Validation check if the field is blank
        if (req.session.data[ section + '-' + page_name_submitted + '-country-typeahead'] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-country-typeahead'] == '')
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';

            // This page name needs to match the page the user was just on
            res.redirect( '../' + page_name_submitted );
        }



        else
        {
            // everything with the input is fine so move on to next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect( '../' + 'check-answers' );
            }
            else
            {
                req.session.data['show-search-staff-name-results'] = 'true';

                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect( '../' + page_name_submitted );
            }
        }
    })



}
