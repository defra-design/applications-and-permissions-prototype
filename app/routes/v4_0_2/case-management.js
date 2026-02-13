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
                res.redirect( '../' + '../application-details' );
            }
        }
    })


}
