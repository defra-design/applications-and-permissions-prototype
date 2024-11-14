const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {




    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/create-application/submit/";


    /*
        Each of the template html pages has corresponding routing javascript.
        This checks for errors and reloads the page showing the error.
        If there are no errors it goes to the next page or back to the 'check your answers' page
        ***  How to use this ***
        1. Copy the correct 'router.post ...' which matches the template you're using
        2. Paste those lines into the routes file for the section of your service you're working on.
        3. On that pasted javascript then use 'Find and replace' to replace the page name with whatever you named the html page/file.
            e.g replace 'PAGENAME_RADIOS' with 'select-country'
        4. On that pasted javascript use 'Find and replace' to replace the next page with whatever you named the next html page/file in the user journey.
            e.g replace 'THE_NEXT_PAGE_NAME' with 'enter-name'
        5. Not all errors will be required in your service.  Delete the lines of javascript which you don't need.
            e.g. If you don't have an upper limit on the number entry then remove the lines around 'else if ( numberinputfloat < 3 )'
        6. If you have a 'Check your answers' page/file in your journey make sure it is in the same folder and is named 'check-answers' to matcth this routing
                If you don't have a 'Check your answers' page/file then remove that javascript from the near the bottom of the javascript you copied.
                This should leave just 'res.redirect('THE_NEXT_PAGE_NAME');'
        7. Your html page should not have working routing.  Check each error and routing scenario works by entering data and clicking continue on that page.
     */







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        check answers declaration                   ////////////////
    ////////////////     then no need to get confirmations of tests?    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.get(section + 'check-answers-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['check-answers-confirmation-checkboxes'] == undefined  ||
            req.session.data['check-answers-confirmation-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('check-answers');
        }

        else
        {
            // Continue to the task list
            req.session.data['application-submitted-by-user'] = "true";
            req.session.data['application-saved-draft'] = "false";
            res.redirect('confirmation');
        }
    })



    // VIEW SUBMITTED APPLICATION
    router.get(section + 'submitted-application-check-answers-router', function (req, res)
    {
        req.session.data['application-submitted-and-locked'] = "true";

        req.session.data['what-move-date-window-start-date-input-day'] = "22";
        req.session.data['what-move-date-window-start-date-input-month'] = "11";
        req.session.data['what-move-date-window-start-date-input-year'] = "2024";
        req.session.data['what-move-date-window-start-date-input-month-number'] = 11;
        req.session.data['what-move-date-window-start-date-input-month-text'] = "November";
        req.session.data['section-what-complete'] = "true";
        req.session.data['origin-to-or-from-own-premises-radios'] = "Off the farm or premises";
        req.session.data['origin-selection-of-own-premises-radios'] = "Your farm, New road, EK32 9LR";
        req.session.data['section-origin-complete'] = "true";
        req.session.data['destination-type-of-destination-radios'] = "A market";
        req.session.data['destination-market-type-radios'] = "Orange market";
        req.session.data['section-destination-complete'] = "true";
        req.session.data['tests-whole-herd-test-radios-yes-no'] = "No";
        req.session.data['section-tests-complete'] = "true";
        req.session.data['tests-origin-confirmation-checkboxes'] = ["I confirm these conditions have been met"];
        req.session.data['identification-microchipped-radios-yes-no'] = "No";
        req.session.data['contact-and-updates-licence-email-or-post-radios'] = "Email";
        req.session.data['contact-and-updates-licence-select-post-address-radios'] = "Another address";
        req.session.data['contact-and-updates-licence-select-email-address-radios'] = "your.name@email.com";
        req.session.data['contact-and-updates-updates-receive-radios-yes-no'] = "Yes";
        req.session.data['contact-and-updates-updates-method-checkboxes'] = ["Email"];
        req.session.data['contact-and-updates-updates-select-email-address-radios'] = "your.name@email.com";
        req.session.data['section-contact-and-updates-complete'] = "true";


        res.redirect('check-answers');
    })

}
