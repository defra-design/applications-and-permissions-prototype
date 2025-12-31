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
    ////////////////             FILE UPLOAD - MANDATORY                ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_FILE_UPLOAD
    // 2. Change THE_NEXT_PAGE_NAME

    router.post( sectionURL + 'PAGENAME_FILE_UPLOAD-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If file was not selected, reload page with error
        if (req.session.data[ section + '-' + page_name_submitted + '-file-upload'] == undefined ||
            req.session.data[ section + '-' + page_name_submitted + '-file-upload'] == "")
        {
            // Trigger validation
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

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
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect( '../' + 'THE_NEXT_PAGE_NAME' );
            }
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////             FILE UPLOAD - MANDATORY                ////////////////
    ////////////////                 NOT COMPLEX PAGE                   ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
