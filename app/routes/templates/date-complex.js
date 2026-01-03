const {log} = require('govuk-prototype-kit/migrator/logger');

let section = 'templates';
let sectionURL = '/' + 'templates' + '/';

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

    // 1. Change PAGENAME_DATE_COMPLEX
    // 2. Change THE_NEXT_PAGE_NAME

    router.post( sectionURL + 'PAGENAME_DATE_COMPLEX-router/:pageName/:arrayOfErrorToggles', function (req, res)
    {
        let default_next_page= 'THE_NEXT_PAGE_NAME';

        let page_name_submitted = req.params.pageName;
        let arrayOfRadioOptionsText = req.params.arrayOfErrorToggles.split(',');
        let errorFutureDateNotAllowed = arrayOfRadioOptionsText[0];
        let errorPastDateNotAllowed = arrayOfRadioOptionsText[1];
        let errorAfterBusinessDateNotAllowed = arrayOfRadioOptionsText[2];
        let errorBeforeBusinessDateNotAllowed = arrayOfRadioOptionsText[3];
        let errorAfterUserEnteredDateNotAllowed = arrayOfRadioOptionsText[4];
        let errorBeforeUserEnteredDateNotAllowed = arrayOfRadioOptionsText[5];



        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////           Resetting all errors to off              ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // set in page errors to off
        req.session.data['errorthispage'] = 'false';
        req.session.data['errortypeone'] = 'false';
        req.session.data['errortypetwo'] = 'false';
        req.session.data['errortypethree'] = 'false';
        req.session.data['errortypefour'] = 'false';
        req.session.data['errortypefive'] = 'false';
        req.session.data['errortypesix'] = 'false';
        req.session.data['errortypeseven'] = 'false';
        req.session.data['errortypeeight'] = 'false';
        req.session.data['errortypenine'] = 'false';
        req.session.data['errortypeten'] = 'false';
        req.session.data['errortypeeleven'] = 'false';
        req.session.data['errortypetwelve'] = 'false';
        req.session.data['errortypethirteen'] = 'false';
        req.session.data['errortypefourteen'] = 'false';
        req.session.data['errortypefifteen'] = 'false';


        // set javascript field check error to off
        let dayEmpty = false;
        let monthEmpty = false;
        let yearEmpty = false;


        ////////////////////////////////////////////////////////////////////////////////////
        ////////////////      Generate previous/closed tax year dates       ////////////////
        ////////////////////////////////////////////////////////////////////////////////////

        // work out what the most recent closed tax year was
        let today = new Date();
        today.setHours(0,0,0,0);
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
        taxyearstartdate.setHours(0,0,0,0);
        let taxyearenddate = new Date( closedTaxYearsEndCalendarYear, 3, 5 );
        taxyearenddate.setHours(0,0,0,0);
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
        if (   req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ] == undefined
            || req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ] == '' )
        {
            dayEmpty = true;
        }
        // Validation check if month field is blank
        if (   req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ] == undefined
            || req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ] == '' )
        {
            monthEmpty = true;
        }
        // Validation check if year field is blank
        if (   req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ] == undefined
            || req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ] == '' )
        {
            yearEmpty = true;
        }


        // Redirect to same page if errors
        if (dayEmpty && monthEmpty && yearEmpty)
        {
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypeone'] = 'true';
        }
        else if (dayEmpty)
        {
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypetwo'] = 'true';
        }
        else if (monthEmpty)
        {
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypethree'] = 'true';
        }
        else if (yearEmpty)
        {
            req.session.data['errorthispage'] = 'true';
            req.session.data['errortypefour'] = 'true';
        }





        ////////////////////////////////////////////////////////////////////////////////////
        /////////                                                                  /////////
        /////////     Error 5 - Incorrect/invalid characters entered for DAY       /////////
        /////////                                                                  /////////
        /////////        Checks day number entered is possible for the year        /////////
        /////////                                                                  /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != 'true')
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ])  )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypefive'] = 'true';
            }

            // Check if date numbers are 0 or impossibly high.
            else if (       req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ] < 1  ||
                       31 < req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypefive'] = 'true';
            }
        }




        ////////////////////////////////////////////////////////////////////////////////////
        ////////     Error 6 Incorrect/invalid characters entered for MONTH       ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != 'true')
        {
            // if no error have been found so far then check for non numbers
            if ( isNaN(req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ]) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypesix'] = 'true';
            }
                // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            else if (        req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ] < 1  ||
                        12 < req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypesix'] = 'true';
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 7 - Incorrect/invalid characters entered for Year        ////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage' ] != 'true')
        {
            // if no error have been found so far then check for non numbers
            if (  isNaN(req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ]) )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypeseven'] = 'true';
            }
        }





        ////////////////////////////////////////////////////////////////////////////////////
        //////////////         Error 8 - Year must be a 4 digit number         /////////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            if (       req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ] < 1000  ||
                9999 < req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ]  )
            {
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypeeight'] = 'true';
            }
        }




        ////////////////////////////////////////////////////////////////////////////////////
        /////////                                                                  /////////
        /////////     Error 9 - Incorrect/invalid date   not in the calendar       /////////
        /////////                                                                  /////////
        /////////        Checks day number entered is possible                     /////////
        /////////                                                                  /////////
        ////////////////////////////////////////////////////////////////////////////////////

        // Check for non numbers being entered
        if (req.session.data['errorthispage'] != 'true')
        {
            var quanityofdaysinmonth =
                new Date(
                    req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ],
                    req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ],
                    0).
                    getDate();

            // Check if date numbers are 0 or impossibly high. e.g. 14th month
            // Check for non numbers being entered
            if ( quanityofdaysinmonth < req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ] )
            {
                // one or more fields isn't a number and isn't empty
                req.session.data['errorthispage'] = 'true';
                req.session.data['errortypenine'] = 'true';
            }
        }






        ////////////////////////////////////////////////////////////////////////////////////
        /////////      Generate date object and update user's inputted date        /////////
        ////////////////////////////////////////////////////////////////////////////////////
        let inputdate = new Date();
        inputdate.setHours(0,0,0,0);

        // If the date has no errors then make a date object
        if (req.session.data['errorthispage'] != 'true')
        {
            inputdate = new Date(
                req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ],
                req.session.data[ section + '-' + page_name_submitted + '-date-input-month' ] - 1,
                req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ]
            );
            inputdate.setHours(0,0,0,0);

            // Save user input date without zeros and month has taxt, e.g. March
            req.session.data[ section + '-' + page_name_submitted + '-date-input-day' ] = inputdate.getDate();
            req.session.data[ section + '-' + page_name_submitted + '-date-input-month-number' ] = inputdate.getMonth() + 1;
            req.session.data[ section + '-' + page_name_submitted + '-date-input-month-text' ] = inputdate.toLocaleString('default', {month: 'long'});
            req.session.data[ section + '-' + page_name_submitted + '-date-input-year' ] = inputdate.getFullYear();
        }




        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 10  -  Date is BEFORE BUSINESS REQUIREMENT DATE        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            // If a user hasn't needed to enter the other date then skip this check
            if (errorBeforeBusinessDateNotAllowed != 'false')
            {
                // Add the number of the day month and year for this business date
                let DAY_of_business_date_before = 0;
                let MONTH_of_business_date_before = 0;
                let YEAR_of_business_date_before = 0;

                let businessDateBeforeLimitName = new Date(
                    DAY_of_business_date_before,
                    MONTH_of_business_date_before- 1,
                    YEAR_of_business_date_before
                );
                businessDateBeforeLimitName.setHours(0,0,0,0);

                if ( inputdate < businessDateBeforeLimitName )
                {
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypeten'] = 'true';
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////     Error 11  -  Date is AFTER BUSINESS REQUIREMENT DATE        /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            // If a user hasn't needed to enter the other date then skip this check
            if (errorAfterBusinessDateNotAllowed != 'false')
            {
                // Add the number of the day month and year for this business date
                let DAY_of_business_date_after = 0;
                let MONTH_of_business_date_after = 0;
                let YEAR_of_business_date_after = 0;

                let businessDateAfterLimitName = new Date(
                    DAY_of_business_date_after,
                    MONTH_of_business_date_after- 1,
                    YEAR_of_business_date_after
                );
                businessDateAfterLimitName.setHours(0,0,0,0);

                if ( businessDateAfterLimitName < inputdate )
                {
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypeeleven'] = 'true';
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        ///////    Error 12  -  Date is BEFORE or same as other user entered date   ////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            // If a user hasn't needed to enter the other date then skip this check
            if (errorBeforeUserEnteredDateNotAllowed != 'false')
            {
                // Rename this to match the session data of the other date inputted by the user
                // DON'T include '-year', '-month' or '-month'
                let userDateSessionDateDataNameBefore = 'PLACEHOLDERdateOTHER';

                let inputUserDateBeforeLimit = new Date(
                    req.session.data[ userDateSessionDateDataNameBefore + '-year' ],
                    req.session.data[ userDateSessionDateDataNameBefore + '-month' ] - 1,
                    req.session.data[ userDateSessionDateDataNameBefore + '-day' ]
                );

                inputUserDateBeforeLimit.setHours(0,0,0,0);

                if ( inputdate <= inputUserDateBeforeLimit )
                {
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypetwelve'] = 'true';
                }
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        ////////   Error 13  -  Date is AFTER or equal to other user entered date   ////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            // If a user hasn't needed to enter the other date then skip this check
            if (errorAfterUserEnteredDateNotAllowed != 'false')
            {
                // Rename this to match the session data of the other date inputted by the user
                // DON'T include '-year', '-month' or '-month'
                let userDateSessionDateDataNameAfter = 'PLACEHOLDERdateOTHER';

                let inputUserDateAfterLimit = new Date(
                    req.session.data[ userDateSessionDateDataNameAfter + '-year' ],
                    req.session.data[ userDateSessionDateDataNameAfter + '-month' ] - 1,
                    req.session.data[ userDateSessionDateDataNameAfter + '-day' ]
                );

                inputUserDateAfterLimit.setHours(0,0,0,0);

                if ( inputUserDateAfterLimit <= inputdate )
                {
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypethirteen'] = 'true';
                }
            }
        }


        ////////////////////////////////////////////////////////////////////////////////////
        ///////     Error 14  -  Date is in the FUTURE - Check if that is allowed    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            // If a user hasn't needed to enter the other date then skip this check
            if (errorFutureDateNotAllowed != 'false')
            {
                if ( today <  inputdate )
                {
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypefourteen'] = 'true';
                }
            }
        }



        ////////////////////////////////////////////////////////////////////////////////////
        /////////    Error 15  -  Date is in the PAST - Check if that is allowed   /////////
        ////////////////////////////////////////////////////////////////////////////////////

        if (req.session.data['errorthispage'] != 'true')
        {
            // If a user hasn't needed to enter the other date then skip this check
            if (errorPastDateNotAllowed != 'false')
            {
                if ( inputdate < today )
                {
                    req.session.data['errorthispage'] = 'true';
                    req.session.data['errortypefifteen'] = 'true';
                }
            }
        }





        ////////////////////////////////////////////////////////////////////////////////////
        //////    Routing for error, no error and returning to check your answers    ///////
        ////////////////////////////////////////////////////////////////////////////////////

        if ( req.session.data['errorthispage'] == 'true' )
        {
            // Redirect to same page with errors
            res.redirect( '../../' + page_name_submitted )
        }
        else if ( req.session.data['camefromcheckanswers'] == 'true' )
        {
            req.session.data['camefromcheckanswers'] = false;
            res.redirect( '../../' +  'check-answers' );
        }
        else
        {
            // No errors
            // redirect to the next page

            res.redirect( '../../' + default_next_page );
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
