const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "/templates/";

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


    router.post(section + 'PAGENAME_TEXTAREA-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_TEXTAREA-text-area-input'] == undefined || req.session.data['SECTION-PAGENAME_TEXTAREA-text-area-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXTAREA');
        }

        else if (req.session.data['SECTION-PAGENAME_TEXTAREA-text-area-input'].length > 15)
        {
            // Trigger validation and relaunch the page for over 15 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXTAREA');
        }

        else if (req.session.data['SECTION-PAGENAME_TEXTAREA-text-area-input'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_TEXTAREA');
        }

        else
        {
            // check no illegal charcters have been used
            const acceptableCharacters =  " abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ&:’\,.()-";
            let inputtext = req.session.data['SECTION-PAGENAME_TEXTAREA-text-area-input'];

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
                res.redirect('PAGENAME_TEXTAREA');
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
                    res.redirect('THE_NEXT_PAGE_NAME');
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
