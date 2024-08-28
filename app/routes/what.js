const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {

    /*
        Setting a version in each routes.js file
        This allows you to make new version of the prototype and have the old versions still work
        This is done by making a copy of the routes files and updating just this version variable for the new version
     */
    let version = "";


    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "create-application/what";


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
    ////////////////            What is being moved                ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/thing-being-moved-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['what-thing-being-moved-radios'] == "Live birds")
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
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }
        else if (req.session.data['what-thing-being-moved-radios'] == "Live cattle")
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
                res.redirect('how-many');
            }
        }
        else if (req.session.data['what-thing-being-moved-radios'] == "Product")
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
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }
        else if (req.session.data['what-thing-being-moved-radios'] == "Something else")
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
                res.redirect('THE_NEXT_PAGE_NAME');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('thing-being-moved');
        }
    })







    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    NUMBER ENTRY                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post('/' + version + section + '/how-many-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";
        req.session.data['errortypesix'] = "false";
        req.session.data['errortypeseven'] = "false";


        // Validation check if field is blank
        if (req.session.data['what-how-many-number-input'] == undefined || req.session.data['what-how-many-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('how-many');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['what-how-many-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['what-how-many-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('how-many');
            }
            else
            {
                // convert String input to a number
                let numberinputfloat =  parseFloat( nocommasinput );


                // Check input is a whole number
                if( numberinputfloat % 1 != 0 )
                {
                    // Trigger validation and relaunch the page
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypetwo'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('how-many');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('how-many');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('how-many');
                }

                else if ( 500 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data['what-how-many-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('how-many');
                }



                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['what-how-many-number-input'] = numberinputfloat.toLocaleString();


                    // If the user needs to go back to 'check your answers' then take them directly there
                    if (req.session.data['camefromcheckanswers'] == 'true')
                    {
                        req.session.data['camefromcheckanswers'] = false;
                        res.redirect('check-answers');
                    }
                    else
                    {
                        // This page name needs to be the next page the user gets to after successfully continuing
                        res.redirect('date-one-day');
                    }
                }
            }

        }

    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////       Move animals all in one day                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/date-one-day-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['what-date-one-day-radios-yes-no'] == "Yes")
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
                // delete any date entered by user for date window
                req.session.data['what-move-date-window-start-date-input-day'] = "";
                req.session.data['what-move-date-window-start-date-input-month'] = "";
                req.session.data['what-move-date-window-start-date-input-year'] = "";

                req.session.data['what-move-date-window-end-date-input-day'] = "";
                req.session.data['what-move-date-window-end-date-input-month'] = "";
                req.session.data['what-move-date-window-end-date-input-year'] = "";

                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('move-date-one-day');
            }
        }
        else if (req.session.data['what-date-one-day-radios-yes-no'] == "No")
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
                // delete any date entered by user for single day
                req.session.data['what-move-date-one-day-date-input-day'] = "";
                req.session.data['what-move-date-one-day-date-input-month'] = "";
                req.session.data['what-move-date-one-day-date-input-year'] = "";

                // This page name needs to be the next page the user gets to after successfully continuing
                res.redirect('move-date-window-start');
            }
        }
        else
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('date-one-day');
        }
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////        What single day are they moving             ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // DATE ENTRY  - NOT COMPLEX PAGE TYPE
    router.post('/' + version + section + '/move-date-one-day-router', function (req, res)
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
        ////////////////    Saving tax year, month, day to session data     ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Start date of the previous/closed tax year
        req.session.data['previous-tax-year-start-date-day'] = taxyearstartdate.getDate();
        req.session.data['previous-tax-year-start-date-month-number'] = taxyearstartdate.getMonth() + 1;
        req.session.data['previous-tax-year-start-date-month-text'] = taxyearstartdate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-start-date-year'] = taxyearstartdate.getFullYear();

        // End date of the previous/closed tax year
        req.session.data['previous-tax-year-end-date-day'] = taxyearenddate.getDate();
        req.session.data['previous-tax-year-end-date-month-number'] = taxyearenddate.getMonth() + 1;
        req.session.data['previous-tax-year-end-date-month-text'] = taxyearenddate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-end-date-year'] = taxyearenddate.getFullYear();

        // Note: the +1 after getMonth().  This is because months are by index so start from 0.




        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['what-move-date-one-day-date-input-day'] == undefined
            || req.session.data['what-move-date-one-day-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['what-move-date-one-day-date-input-month'] == undefined
            || req.session.data['what-move-date-one-day-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['what-move-date-one-day-date-input-year'] == undefined
            || req.session.data['what-move-date-one-day-date-input-year'] == "" )
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
            if (  isNaN(req.session.data['what-move-date-one-day-date-input-year']) )
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
            if (  req.session.data['what-move-date-one-day-date-input-year'] < 1000  ||  9999 < req.session.data['what-move-date-one-day-date-input-year']  )
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
            if ( isNaN(req.session.data['what-move-date-one-day-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['what-move-date-one-day-date-input-month'] < 1  ||  12 < req.session.data['what-move-date-one-day-date-input-month'] )
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
            var quanityofdaysinmonth =  new Date(req.session.data['what-move-date-one-day-date-input-year'], req.session.data['what-move-date-one-day-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['what-move-date-one-day-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['what-move-date-one-day-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['what-move-date-one-day-date-input-day'] )
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
                req.session.data['what-move-date-one-day-date-input-year'],
                req.session.data['what-move-date-one-day-date-input-month'] - 1,
                req.session.data['what-move-date-one-day-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['what-move-date-one-day-date-input-day'] = inputdate.getDate();
            req.session.data['what-move-date-one-day-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['what-move-date-one-day-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['what-move-date-one-day-date-input-year'] = inputdate.getFullYear();
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 12 - Date MUST be in the future          /////////////
        //////////////                                                      /////////////
        ////////////////////////////////////////////////////////////////////////////////////



        if (req.session.data['errorthispage'] != "true") {
            // if date entered if after the previous tax year

            if ( inputdate < today ) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwelve'] = "true";
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('move-date-one-day')
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( 'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            // For PLACEHOLDER template only. This should go to the next page.
            res.redirect('check-answers')
        }


    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     What is the first date of moving window         ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // DATE ENTRY  - NOT COMPLEX PAGE TYPE
    router.post('/' + version + section + '/move-date-window-start-router', function (req, res)
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
        ////////////////    Saving tax year, month, day to session data     ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Start date of the previous/closed tax year
        req.session.data['previous-tax-year-start-date-day'] = taxyearstartdate.getDate();
        req.session.data['previous-tax-year-start-date-month-number'] = taxyearstartdate.getMonth() + 1;
        req.session.data['previous-tax-year-start-date-month-text'] = taxyearstartdate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-start-date-year'] = taxyearstartdate.getFullYear();

        // End date of the previous/closed tax year
        req.session.data['previous-tax-year-end-date-day'] = taxyearenddate.getDate();
        req.session.data['previous-tax-year-end-date-month-number'] = taxyearenddate.getMonth() + 1;
        req.session.data['previous-tax-year-end-date-month-text'] = taxyearenddate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-end-date-year'] = taxyearenddate.getFullYear();

        // Note: the +1 after getMonth().  This is because months are by index so start from 0.




        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['what-move-date-window-start-date-input-day'] == undefined
            || req.session.data['what-move-date-window-start-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['what-move-date-window-start-date-input-month'] == undefined
            || req.session.data['what-move-date-window-start-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['what-move-date-window-start-date-input-year'] == undefined
            || req.session.data['what-move-date-window-start-date-input-year'] == "" )
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
            if (  isNaN(req.session.data['what-move-date-window-start-date-input-year']) )
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
            if (  req.session.data['what-move-date-window-start-date-input-year'] < 1000  ||  9999 < req.session.data['what-move-date-window-start-date-input-year']  )
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
            if ( isNaN(req.session.data['what-move-date-window-start-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['what-move-date-window-start-date-input-month'] < 1  ||  12 < req.session.data['what-move-date-window-start-date-input-month'] )
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
            var quanityofdaysinmonth =  new Date(req.session.data['what-move-date-window-start-date-input-year'], req.session.data['what-move-date-window-start-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['what-move-date-window-start-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['what-move-date-window-start-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['what-move-date-window-start-date-input-day'] )
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
                req.session.data['what-move-date-window-start-date-input-year'],
                req.session.data['what-move-date-window-start-date-input-month'] - 1,
                req.session.data['what-move-date-window-start-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['what-move-date-window-start-date-input-day'] = inputdate.getDate();
            req.session.data['what-move-date-window-start-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['what-move-date-window-start-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['what-move-date-window-start-date-input-year'] = inputdate.getFullYear();
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 12 - Date MUST be in the future          /////////////
        //////////////                                                      /////////////
        ////////////////////////////////////////////////////////////////////////////////////



        if (req.session.data['errorthispage'] != "true") {
            // if date entered if after the previous tax year

            if ( inputdate < today ) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwelve'] = "true";
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('move-date-window-start')
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( 'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            // For PLACEHOLDER template only. This should go to the next page.
            res.redirect('move-date-window-end')
        }


    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////     What is the final date of moving window         ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // DATE ENTRY  - NOT COMPLEX PAGE TYPE
    router.post('/' + version + section + '/move-date-window-end-router', function (req, res)
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
        ////////////////    Saving tax year, month, day to session data     ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Start date of the previous/closed tax year
        req.session.data['previous-tax-year-start-date-day'] = taxyearstartdate.getDate();
        req.session.data['previous-tax-year-start-date-month-number'] = taxyearstartdate.getMonth() + 1;
        req.session.data['previous-tax-year-start-date-month-text'] = taxyearstartdate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-start-date-year'] = taxyearstartdate.getFullYear();

        // End date of the previous/closed tax year
        req.session.data['previous-tax-year-end-date-day'] = taxyearenddate.getDate();
        req.session.data['previous-tax-year-end-date-month-number'] = taxyearenddate.getMonth() + 1;
        req.session.data['previous-tax-year-end-date-month-text'] = taxyearenddate.toLocaleString('default', { month: 'long' });
        req.session.data['previous-tax-year-end-date-year'] = taxyearenddate.getFullYear();

        // Note: the +1 after getMonth().  This is because months are by index so start from 0.




        ////////////////////////////////////////////////////////////////////////////////////
        //////////      Error 1,2,3,4,5,6,7 - Empty day month or year field       //////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Validation check if day field is blank
        if ( req.session.data['what-move-date-window-end-date-input-day'] == undefined
            || req.session.data['what-move-date-window-end-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['what-move-date-window-end-date-input-month'] == undefined
            || req.session.data['what-move-date-window-end-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['what-move-date-window-end-date-input-year'] == undefined
            || req.session.data['what-move-date-window-end-date-input-year'] == "" )
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
            if (  isNaN(req.session.data['what-move-date-window-end-date-input-year']) )
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
            if (  req.session.data['what-move-date-window-end-date-input-year'] < 1000  ||  9999 < req.session.data['what-move-date-window-end-date-input-year']  )
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
            if ( isNaN(req.session.data['what-move-date-window-end-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['what-move-date-window-end-date-input-month'] < 1  ||  12 < req.session.data['what-move-date-window-end-date-input-month'] )
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
            var quanityofdaysinmonth =  new Date(req.session.data['what-move-date-window-end-date-input-year'], req.session.data['what-move-date-window-end-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['what-move-date-window-end-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeleven'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['what-move-date-window-end-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['what-move-date-window-end-date-input-day'] )
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
                req.session.data['what-move-date-window-end-date-input-year'],
                req.session.data['what-move-date-window-end-date-input-month'] - 1,
                req.session.data['what-move-date-window-end-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['what-move-date-window-end-date-input-day'] = inputdate.getDate();
            req.session.data['what-move-date-window-end-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['what-move-date-window-end-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['what-move-date-window-end-date-input-year'] = inputdate.getFullYear();
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 12 - Date MUST be in the future          /////////////
        //////////////                                                      /////////////
        ////////////////////////////////////////////////////////////////////////////////////



        if (req.session.data['errorthispage'] != "true") {
            // if date entered if after the previous tax year

            if ( inputdate < today ) {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwelve'] = "true";
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 16 -  date is AFTER other user entered date         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check

                let inputmovementwindowstartdate = new Date(
                    req.session.data['what-move-date-window-start-date-input-year'],
                    req.session.data['what-move-date-window-start-date-input-month'] - 1,
                    req.session.data['what-move-date-window-start-date-input-day']
                );

                if (inputdate <= inputmovementwindowstartdate) {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesixteen'] = "true";
                }

        }


        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('move-date-window-end')
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( 'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            // For PLACEHOLDER template only. This should go to the next page.
            res.redirect('check-answers')
        }


    })




}
