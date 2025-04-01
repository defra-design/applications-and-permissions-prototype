const {log} = require("govuk-prototype-kit/migrator/logger");

let section = "/templates/";

module.exports = function (router)
{


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////               PLACEHOLDER_SUMMARY                  ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   DATE ENTRY                       ////////////////
    ////////////////                  COMPLEX PAGE                      ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post(section + 'PAGENAME_DATE_COMPLEX-router', function (req, res)
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
        if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] == undefined
            || req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] == "" )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] == undefined
            || req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] == "" )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] == undefined
            || req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] == "" )
        {
            yearEmpty = true;
        }


        // Redirect to same page if errors
        if (dayEmpty && monthEmpty && yearEmpty)
        {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";
        }
        else if (dayEmpty)
        {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypetwo'] = "true";
        }
        else if (monthEmpty)
        {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypethree'] = "true";
        }
        else if (yearEmpty)
        {
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypefour'] = "true";
        }


        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 5 - Incorrect/invalid characters entered for DAY       /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            var quanityofdaysinmonth =  new Date(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'], req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'], 0).getDate();

            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefive'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (  req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] < 1  ||  quanityofdaysinmonth < req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefive'] = "true";
            }
        }





        ////////////////////////////////////////////////////////////////////////////////////
        ////////     Error 6 Incorrect/invalid characters entered for MONTH       ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypesix'] = "true";
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if ( req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] < 1  ||  12 < req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypesix'] = "true";
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 7 - Incorrect/invalid characters entered for Year        ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != "true")
        {
            // if no error have been found so far then check for non numbers
            if (  isNaN(req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year']) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeseven'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 8 - Year must be a 4 digit number         /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            if (  req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] < 1000  ||  9999 < req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year']  )
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeeight'] = "true";
            }
        }








        ////////////////////////////////////////////////////////////////////////////////////
        /////////      Generate date object and update user's inputted date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        let inputdate = new Date();

        if (req.session.data['errorthispage'] != "true")
        {
            inputdate = new Date(
                req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'],
                req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month'] - 1,
                req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day']
            );

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-day'] = inputdate.getDate();
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month-number'] = inputdate.getMonth() + 1;
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-month-text'] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data['SECTION-PAGENAME_DATE_COMPLEX-date-input-year'] = inputdate.getFullYear();
        }



        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 9 - Date can't be in the future           /////////////
        //////////////           Unlikely that this will be needed             /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // if date entered is after today
            if (today < inputdate)
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypenine'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////            Error 10  -  Date is AFTER 1 January 1900             /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // If user entered date that is after 1 January
            let startoflastcentury = new Date(1900, 0, 1);
            if (inputdate <= startoflastcentury)
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeten'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 11  -  Date is BEFORE other user entered date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes")
            {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );
                if (inputPLACEHOLDERdateOTHER <= inputdate)
                {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeeleven'] = "true";
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 12  -  Date is AFTER other user entered date        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // If user entered date that is after the PLACEHOLDER date
            // If a user hasn't needed to enter the other date then skip this check
            if (req.session.data['PLACEHOLDER-OTHER-DATE-IN-USE'] == "Yes")
            {
                let inputPLACEHOLDERdateOTHER = new Date(
                    req.session.data['PLACEHOLDERdateOTHER-year'],
                    req.session.data['PLACEHOLDERdateOTHER-month'] - 1,
                    req.session.data['PLACEHOLDERdateOTHER-day']
                );

                if (inputdate <= inputPLACEHOLDERdateOTHER)
                {
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypetwelve'] = "true";
                }
            }
        }




        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 13 - date is BEFORE previous/closed tax year        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // if date entered is before the previous tax year
            if (inputdate < taxyearstartdate)
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypethirteen'] = "true";
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////        Error 14 - date is AFTER previous/closed tax year         /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != "true")
        {
            // if date entered is before the previous tax year
            if (taxyearenddate < inputdate)
            {
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypefourteen'] = "true";
            }
        }









        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect('PAGENAME_DATE_COMPLEX')
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
            res.redirect('THE_NEXT_PAGE_NAME')
        }


    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                     END OF                         ////////////////
    ////////////////                                                    ////////////////
    ////////////////                   DATE ENTRY                       ////////////////
    ////////////////                  COMPLEX PAGE                      ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////





}
