const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "/templates/";

module.exports = function (router)
{

    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////             FILE UPLOAD - MANDATORY                ////////////////
    ////////////////                   COMPLEX PAGE                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'PAGENAME_FILE_UPLOAD_COMPLEX-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If file was not selected, reload page with error
        if (req.session.data['PAGENAME_FILE_UPLOAD_COMPLEX-file-upload'] == undefined || req.session.data['PAGENAME_FILE_UPLOAD_COMPLEX-file-upload'] == "")
        {
            // Trigger validation
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // Reload the page
            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_FILE_UPLOAD_COMPLEX');
        }
        else
        {
            // Continue to the next page
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
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////             FILE UPLOAD - MANDATORY                ////////////////
    ////////////////                  COMPLEX PAGE                      ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
