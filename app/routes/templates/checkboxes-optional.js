const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "/templates/";

module.exports = function (router)
{


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////             CHECKBOXES - OPTIONAL                  ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'PAGENAME_CHECKBOXES_OPTIONAL-router', function (req, res)
    {
        // Make formatted text for check answer review page
        if (req.session.data['SECTION-PAGENAME_CHECKBOXES_OPTIONAL-checkboxes'] != undefined &&
            req.session.data['SECTION-PAGENAME_CHECKBOXES_OPTIONAL-checkboxes'].length != 0)
        {
            var checkboxestext = "";
            checkboxestext = req.session.data['SECTION-PAGENAME_CHECKBOXES_OPTIONAL-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data['SECTION-PAGENAME_CHECKBOXES_OPTIONAL-checkboxes-formatted'] = newStringmanure;

        }
        else
        {
            req.session.data['SECTION-PAGENAME_CHECKBOXES_OPTIONAL-checkboxes-formatted'] = "";
        }


        // Continue to the next page

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
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////              CHECKBOXES - OPTIONAL                 ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////






}
