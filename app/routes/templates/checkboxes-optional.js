const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "templates";
let sectionURL = "/" + "templates" + "/";

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

    // 1. Change PAGENAME_CHECKBOXES_OPTIONAL
    // 2. Change THE_NEXT_PAGE_NAME

    // 3. Optional - Change the conditional next page when a specific checkbox is selected.

    router.post(sectionURL + 'PAGENAME_CHECKBOXES_OPTIONAL-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // check if none of the checkboxes are selected
        if(req.session.data[section + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
           req.session.data[section + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            req.session.data[section + '-' + page_name_submitted + '-checkboxes-formatted'] == '';
        }

        else
        {
            let checkboxestext = "";
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;

            // Continue to the next page
            if(req.session.data[section + '-' + page_name_submitted + '-checkboxes'].includes("PLACEHOLDER_CHECKBOX_TEXT") )
            {
                res.redirect('../' + 'CONDITONAL_NEXT_PAGE_NAME');
            }

            // If the user needs to go back to 'check your answers' then take them directly there
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
        }

        // This page name needs to be the next page the user gets to after successfully continuing
        res.redirect('../' + 'THE_NEXT_PAGE_NAME');


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
