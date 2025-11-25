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
    ////////////////                 COMPLEX PAGE                       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // 1. Change PAGENAME_YES_NO_COMPLEX
    // 2. Change THE_NEXT_PAGE_NAME

    router.post(sectionURL + 'PAGENAME_CHECKBOXES_COMPLEX-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        // check if none of the checkboxes are selected
        if(req.session.data[section + '-' + page_name_submitted + '-checkboxes'] == undefined  ||
            req.session.data[section + '-' + page_name_submitted + '-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            res.redirect('../' + page_name_submitted);
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
            else if (req.session.data['camefromcheckanswers'] == 'true')
            {
                // If the user needs to go back to 'check your answers' then take them directly there
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('../' + 'check-answers');
            }
            else
            {
                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('../' + 'THE_NEXT_PAGE_NAME');
            }
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////              CHECKBOXES - OPTIONAL                 ////////////////
    ////////////////                 COMPLEX PAGE                       ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////




    
}
