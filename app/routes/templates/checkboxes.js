const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "templates";
let sectionURL = "/" + section + "/";

module.exports = function (router)
{


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(sectionURL + 'PAGENAME_CHECKBOXES-router/:pageName', function (req, res)
    {
        let page_name_submitted = req.params.pageName;

        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        var checkboxestext = "";

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
            // Make formatted text for check answer review page
            checkboxestext = req.session.data[section + '-' + page_name_submitted + '-checkboxes'].toString();

            let newStringmanure = checkboxestext.replace(/,(?!\s)/g, "\n\n");
            req.session.data[section + '-' + page_name_submitted + '-checkboxes-formatted'] = newStringmanure;


            // Continue to the next page

            // If the user needs to go back to 'check your answers' then take them directly there
            if (req.session.data['camefromcheckanswers'] == 'true')
            {
                req.session.data['camefromcheckanswers'] = false;
                res.redirect('check-answers');
            }
            else
            {
                res.redirect('../' + 'THE_NEXT_PAGE_NAME');
            }
        }
    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   CHECKBOXES                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
