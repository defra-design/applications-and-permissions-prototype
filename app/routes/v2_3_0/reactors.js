const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {

    /*
        Setting a version in each routes.js file
        This allows you to make new version of the prototype and have the old versions still work
        This is done by making a copy of the routes files and updating just this version variable for the new version
     */


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "/create-application/reactors/";



    // NOT COMPLEX PAGE
    router.get(section + 'begin-reactors-section', function (req, res)
    {
        res.redirect('any-reactors');
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             Any reactors                           ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'any-reactors-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['reactors-any-reactors-radios-yes-no'] == "Yes")
        {
            res.redirect('any-date-to-remove-reactors');
        }
        else if (req.session.data['reactors-any-reactors-radios-yes-no'] == "No")
        {
            res.redirect('check-answers');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('any-reactors');
        }
    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////              any date to remove reactors           ////////////////
    ////////////////                                                    ////////////////
    ////////////////       YES AND NO - RADIO BUTTONS - MANDATORY       ////////////////
    ////////////////                  NOT COMPLEX PAGE                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'any-date-to-remove-reactors-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['reactors-any-date-to-remove-reactors-radios-yes-no'] == "Yes")
        {
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
                res.redirect('date-of-reactor-removal');
            }
        }
        else if (req.session.data['reactors-any-date-to-remove-reactors-radios-yes-no'] == "No")
        {
            res.redirect('you-must-remove-reactors');
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('any-date-to-remove-reactors');
        }
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   DATE ENTRY                       ////////////////
    ////////////////                NOT COMPLEX PAGE                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'date-of-reactor-removal-router', function (req, res)
    {
        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////           Resetting all errors to off              ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // set in page errors to off
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";
        req.session.data['errortypeeight'] = "false";
        req.session.data['errortypenine'] = "false";
        req.session.data['errortypeten'] = "false";
        req.session.data['errortypeeleven'] = "false";
        req.session.data['errortypetwelve'] = "false";
        req.session.data['errortypethirteen'] = "false";
        req.session.data['errortypefourteen'] = "false";
        req.session.data['errortypefifteen'] = "false";
        req.session.data['errortypesixteen'] = "false";
        req.session.data['errortypeseventeen'] = "false";

        // set javascript field check error to off
        let dayEmpty = false;
        let monthEmpty = false;
        let yearEmpty = false;




        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////      Generate previous/closed tax year dates       ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // work out what the most recent closed tax year was
        let today = new Date();
        let closedTaxYearsEndCalendarYear;

        if ( today.getMonth() <= 2 )
        {
            //  It's January, feb or march
            // select previous calendar year as tax year calendar end date
            closedTaxYearsEndCalendarYear = today.getFullYear() - 1;
        }
        else if ( today.getMonth() == 3  &&   today.getDate() < 6  )
        {
            // today is earl april so we're in the very end of the following tax year
            // select previous calendar year as tax year calendar end date
            closedTaxYearsEndCalendarYear = today.getFullYear() - 1;
        }
        else
        {
            // current date is between April 6 and December 31
            closedTaxYearsEndCalendarYear = today.getFullYear();
        }

        let taxyearstartdate = new Date( closedTaxYearsEndCalendarYear-1, 3, 6 );
        let taxyearenddate = new Date( closedTaxYearsEndCalendarYear, 3, 5 );
        // note that April is written as month 3.  Tediously, months start from 0, year and date start from 1.




  



        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['reactors-date-of-reactor-removal-date-input-day'] == undefined
            || req.session.data['reactors-date-of-reactor-removal-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['reactors-date-of-reactor-removal-date-input-month'] == undefined
            || req.session.data['reactors-date-of-reactor-removal-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['reactors-date-of-reactor-removal-date-input-year'] == undefined
            || req.session.data['reactors-date-of-reactor-removal-date-input-year'] == "" )
        {
            yearEmpty = true;
        }


        // Redirect to same page if errors
        if (dayEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (monthEmpty && yearEmpty )
            {
                // all fields are empty
                req.session.data['errortypeone'] = "true";
            }
            else if(monthEmpty)
            {
                // day and month are empty only
                req.session.data['errortypefive'] = "true";
            }
            else if (yearEmpty)
            {
                // day and year are empty only
                req.session.data['errortypesix'] = "true";
            }
            else
            {
                // just day is empty
                req.session.data['errortypetwo'] = "true";
            }
        }
        else if (monthEmpty)
        {
            req.session.data['errorthispage'] = "true";
            if (yearEmpty)
            {
                // month and year are empty only
                req.session.data['errortypeseven'] = "true";
            }
            else
            {
                // just month is empty
                req.session.data['errortypethree'] = "true";
            }
        }
        else if (yearEmpty)
        {
            req.session.data['errorthispage'] = "true";
            // Only year is empty
            req.session.data['errortypefour'] = "true";
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 8 - Incorrect/invalid characters entered for Year        ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if (  isNaN(req.session.data['reactors-date-of-reactor-removal-date-input-year']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeight'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 9 - Year must be a 4 digit number         /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            if (  req.session.data['reactors-date-of-reactor-removal-date-input-year'] < 1000  ||  9999 < req.session.data['reactors-date-of-reactor-removal-date-input-year']  )
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypenine'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ////////     Error 10 - Incorrect/invalid characters entered for MONTH       ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['reactors-date-of-reactor-removal-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['reactors-date-of-reactor-removal-date-input-month'] < 1  ||  12 < req.session.data['reactors-date-of-reactor-removal-date-input-month'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 11 - Incorrect/invalid characters entered for DAY       /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            var quanityofdaysinmonth =  new Date(req.session.data['reactors-date-of-reactor-removal-date-input-year'], req.session.data['reactors-date-of-reactor-removal-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['reactors-date-of-reactor-removal-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['reactors-date-of-reactor-removal-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['reactors-date-of-reactor-removal-date-input-day'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////      Generate date object and update user's inputted date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        let inputdate = new Date();

        if (req.session.data['errorthispage'] != "true")
        {
            inputdate = new Date(
                req.session.data['reactors-date-of-reactor-removal-date-input-year'],
                req.session.data['reactors-date-of-reactor-removal-date-input-month'] - 1,
                req.session.data['reactors-date-of-reactor-removal-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['reactors-date-of-reactor-removal-date-input-day'] = inputdate.getDate();
            req.session.data['reactors-date-of-reactor-removal-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['reactors-date-of-reactor-removal-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['reactors-date-of-reactor-removal-date-input-year'] = inputdate.getFullYear();
        }



            ////////////////////////////////////////////////////////////////////////////////////
            //////////////         Error 12 - Date can't be in the future          /////////////
            //////////////         Very unlikely that this will be needed          /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered if after the previous tax year
            if (today < inputdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwelve'] = "true";
            }
        }



            ////////////////////////////////////////////////////////////////////////////////////
            /////////        Error 13 - date is BEFORE previous/closed tax year        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (inputdate < taxyearstartdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypethirteen'] = "true";
            }
        }



            ////////////////////////////////////////////////////////////////////////////////////
            /////////        Error 14 - date is AFTER previous/closed tax year         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // if date entered is before the previous tax year
            if (taxyearenddate < inputdate) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefourteen'] = "true";
            }
        }



            ////////////////////////////////////////////////////////////////////////////////////
            /////////        Error 15 -  date is BEFORE other user entered date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        else if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes") {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );
                if (inputPLACEHOLDERdateOTHER <= inputdate) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefifteen'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 16 -  date is AFTER other user entered date         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes") {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );

                if (inputdate <= inputPLACEHOLDERdateOTHER) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesixteen'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////            Error 17 -  date is AFTER 1 January 1900              /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true") {
            // If user entered date that is after 1 January
            let startoflastcentury = new Date(1900, 0, 1);
            if (inputdate <= startoflastcentury) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeseventeen'] = "true";
            }
        }




        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('date-of-reactor-removal')
        }
        else
        {
            res.redirect( 'check-answers' );
        }

    })




}
