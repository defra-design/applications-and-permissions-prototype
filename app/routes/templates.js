const govukPrototypeKit = require('govuk-prototype-kit');

const router = govukPrototypeKit.requests.setupRouter('/');

// Import subfiles
require('./templates/yes-no.js')(router);
require('./templates/radios.js')(router);
require('./templates/text.js')(router);
require('./templates/date.js')(router);


const {log} = require("govuk-prototype-kit/migrator/logger");
module.exports = function (router) {




    /*
        Setting a section in each routes.js file
        This allows you to have different routes.js files for each section of your prototype
        e.g  registration.js   and   search.js
        This avoids having one huge hard to manage routes.js
     */
    let section = "templates";


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
    ////////////////                CHECKBOXES - OPTIONAL              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES_OPTIONAL-router', function (req, res)
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
    })


    ////////////////////////////////////////////////////////////////////////////////////
    //  COMPLEX PAGE  FOR CHECKBOXES - OPTIONAL
    ////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES_OPTIONAL_COMPLEX-router', function (req, res)
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
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////               CHECKBOXES - OPTIONAL                ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////










    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                CHECKBOXES - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['SECTION-PAGENAME_CHECKBOXES-checkboxes'] == undefined  ||
           req.session.data['SECTION-PAGENAME_CHECKBOXES-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_CHECKBOXES');
        }

        else
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
    })



    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF  CHECKBOXES
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_CHECKBOXES_COMPLEX-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // check if none of the checkboxes are selected
        if(req.session.data['SECTION-PAGENAME_CHECKBOXES_COMPLEX-checkboxes'] == undefined  ||
            req.session.data['SECTION-PAGENAME_CHECKBOXES_COMPLEX-checkboxes'].length == 0)
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_CHECKBOXES_COMPLEX');
        }

        else
        {
            // Turn off validation
            req.session.data['errorthispage'] = "false";
            req.session.data['errortypeone'] = "false";

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
    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             CHECKBOXES - MANDATORY                 ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////



























    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    NUMBER ENTRY                    ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    router.post('/' + version + section + '/PAGENAME_NUMBER-router', function (req, res)
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
        if (req.session.data['SECTION-PAGENAME_NUMBER-number-input'] == undefined || req.session.data['SECTION-PAGENAME_NUMBER-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_NUMBER');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['SECTION-PAGENAME_NUMBER-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['SECTION-PAGENAME_NUMBER-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_NUMBER');
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
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat < 3 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( 13 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }

                else if ( numberinputfloat < 5  ||  8 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeseven'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER-number-input'] = numberinputfloat.toLocaleString();


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
            }

        }

    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF NUMBER ENTRY
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_NUMBER_COMPLEX-router', function (req, res)
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
        if (req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] == undefined || req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_NUMBER_COMPLEX');
        }
        else
        {
            // Remove any commas which the user or this routing added
            let nocommasinput = req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'].replace(/,/g, '');

            // if not a number throw first error
            if( isNaN(req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input']) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypeone'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_NUMBER_COMPLEX');
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
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat == 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 3 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefive'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( 13 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypesix'] = "true";

                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] = numberinputfloat.toLocaleString();

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }

                else if ( numberinputfloat < 5  ||  8 < numberinputfloat )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypeseven'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_NUMBER_COMPLEX');
                }


                // everything with the input is fine so move on to next page
                else
                {
                    // Format the number with commas
                    req.session.data['SECTION-PAGENAME_NUMBER_COMPLEX-number-input'] = numberinputfloat.toLocaleString();


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
            }

        }

    })


    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             NUMBER ENTRY - MANDATORY               ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////










    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                    MONEY ENTRY                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    // MONEY ENTRY  - NOT complex page
    router.post('/' + version + section + '/PAGENAME_MONEY-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";


        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_MONEY-money-input'] == undefined || req.session.data['SECTION-PAGENAME_MONEY-money-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_MONEY');
        }
        else
        {
            // Make any entered or existing amount have no commas
            let nocommasinput = req.session.data['SECTION-PAGENAME_MONEY-money-input'].replace(/,/g, '');
            let nocommasinputfloat = parseFloat(req.session.data['SECTION-PAGENAME_MONEY-money-input'].replace(/,/g, ''));

            // if not a number throw first error
            if( isNaN( nocommasinput ) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_MONEY');
            }
            else
            {
                // make numbers to 2 decimal places and add in commas, also adds £ symbol
                let tempnumber = new Intl.NumberFormat('en-GB', { style: "currency", currency: "GBP"}).format( nocommasinputfloat );

                // Remove pound symbol
                let moneyformatted = tempnumber.replace(/\u00A3/g, '');
                req.session.data['SECTION-PAGENAME_MONEY-money-input'] = moneyformatted;


                // if the number is too large
                // Set this number for your context
                req.session.data['madeupamountmoneymaximum'] = "50.00";
                let maximumamountmoney = parseFloat(req.session.data['madeupamountmoneymaximum'].replace(/,/g, ''));
                if ( maximumamountmoney < nocommasinputfloat )
                {
                    // Trigger validation and relaunch the page for amount lower than 50
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY');
                }

                // if the number is 0 or less
                else if ( nocommasinputfloat <= 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY');
                }
                else
                {
                    // This number would be in the session from where a suer has entered it on a proceeding page
                    req.session.data['madeupamount'] = "10.00";
                    let anotheramount = parseFloat(req.session.data['madeupamount'].replace(/,/g, ''));

                    // if the number is larger than the user entered on a previous section when it can't be.
                    // e.g. Income tax must be less than income amount
                    if ( anotheramount < nocommasinputfloat )
                    {
                        // Trigger validation and relaunch the page for number larger than the user entered on a previous section
                        req.session.data['errorthispage'] = "true";
                        req.session.data['errortypefive'] = "true";

                        // This page name needs to match the page the user was just on
                        res.redirect('PAGENAME_MONEY');
                    }


                    // everything with the input is fine so move on to next page
                    else
                    {
                        // Save a separate bit of session data which shows the amount with the pound sign
                        req.session.data['SECTION-PAGENAME_MONEY-money-input-with-pound-sign'] = "£" + moneyformatted;

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
                }

            }

        }

    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE FOR MONEY INPUT
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_MONEY_COMPLEX-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";
        req.session.data['errortypefive'] = "false";


        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'] == undefined || req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_MONEY_COMPLEX');
        }
        else
        {
            // Make any entered or existing amount have no commas
            let nocommasinput = req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'].replace(/,/g, '');
            let nocommasinputfloat = parseFloat(req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'].replace(/,/g, ''));

            // if not a number throw first error
            if( isNaN( nocommasinput ) )
            {
                // Trigger validation and relaunch the page
                req.session.data['errorthispage'] = "true";
                req.session.data['errortypetwo'] = "true";

                // This page name needs to match the page the user was just on
                res.redirect('PAGENAME_MONEY_COMPLEX');
            }
            else
            {
                // make numbers to 2 decimal places and add in commas, also adds £ symbol
                let tempnumber = new Intl.NumberFormat('en-GB', { style: "currency", currency: "GBP"}).format( nocommasinputfloat );

                // Remove pound symbol
                let moneyformatted = tempnumber.replace(/\u00A3/g, '');
                req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input'] = moneyformatted;


                // if the number is too large
                // Set this number for your context
                req.session.data['madeupamountmoneymaximum'] = "50.00";
                let maximumamountmoney = parseFloat(req.session.data['madeupamountmoneymaximum'].replace(/,/g, ''));
                if ( maximumamountmoney < nocommasinputfloat )
                {
                    // Trigger validation and relaunch the page for amount lower than 50
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypethree'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY_COMPLEX');
                }

                // if the number is 0 or less
                else if ( nocommasinputfloat <= 0 )
                {
                    // Trigger validation and relaunch the page for number lower than 4
                    req.session.data['errorthispage'] = "true";
                    req.session.data['errortypefour'] = "true";

                    // This page name needs to match the page the user was just on
                    res.redirect('PAGENAME_MONEY_COMPLEX');
                }
                else
                {
                    // This number would be in the session from where a suer has entered it on a proceeding page
                    req.session.data['madeupamount'] = "10.00";
                    let anotheramount = parseFloat(req.session.data['madeupamount'].replace(/,/g, ''));

                    // if the number is larger than the user entered on a previous section when it can't be.
                    // e.g. Income tax must be less than income amount
                    if ( anotheramount < nocommasinputfloat )
                    {
                        // Trigger validation and relaunch the page for number larger than the user entered on a previous section
                        req.session.data['errorthispage'] = "true";
                        req.session.data['errortypefive'] = "true";

                        // This page name needs to match the page the user was just on
                        res.redirect('PAGENAME_MONEY_COMPLEX');
                    }


                    // everything with the input is fine so move on to next page
                    else
                    {
                        // Save a separate bit of session data which shows the amount with the pound sign
                        req.session.data['SECTION-PAGENAME_MONEY_COMPLEX-money-input-with-pound-sign'] = "£" + moneyformatted;

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
                }

            }

        }

    })





    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////                    MONEY ENTRY                     ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////

















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             COUNTRY ENTRY - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////


    // COUNTRY ENTRY - NOT COMPLEX PAGE
    router.post('/' + version + section + '/PAGENAME_COUNTRY-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";
        req.session.data['errortypethree'] = "false";
        req.session.data['errortypefour'] = "false";

        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_COUNTRY-country-type-ahead'] == undefined || req.session.data['SECTION-PAGENAME_COUNTRY-country-type-ahead'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY');
        }

        else if (req.session.data['SECTION-PAGENAME_COUNTRY-country-type-ahead'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY');
        }

        else
        {
            // everything with the input is fine so move on to next page

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
    })




    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF TEXT ENTRY
    /////////////////////////////////////////////////////////////////////////////////////////////
    router.post('/' + version + section + '/PAGENAME_COUNTRY_COMPLEX-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";

        // Validation check if field is blank
        if (req.session.data['SECTION-PAGENAME_COUNTRY_COMPLEX-country-type-ahead'] == undefined || req.session.data['SECTION-PAGENAME_COUNTRY_COMPLEX-country-type-ahead'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY_COMPLEX');
        }

        else if (req.session.data['SECTION-PAGENAME_COUNTRY_COMPLEX-country-type-ahead'].length < 4)
        {
            // Trigger validation and relaunch the page for under 5 characters
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_COUNTRY_COMPLEX');
        }

        else
        {
            // everything with the input is fine so move on to next page

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

    })



    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             COUNTRY ENTRY - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////















    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////             FILE UPLOAD - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////

    router.post('/' + version + section + '/PAGENAME_FILE_UPLOAD-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If file was not selected, reload page with error
        if (req.session.data['PAGENAME_FILE_UPLOAD-file-upload'] == undefined || req.session.data['PAGENAME_FILE_UPLOAD-file-upload'] == "")
        {
            // Trigger validation
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // Reload the page
            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_FILE_UPLOAD');
        }
        else
        {
            // Continue to the next page
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
    })



    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////
    // COMPLEX PAGE  OF TEXT ENTRY
    /////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////

    router.post('/' + version + section + '/PAGENAME_FILE_UPLOAD_COMPLEX-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If file was not selected, reload page with error
        if (req.session.data['PAGENAME_FILE_UPLOAD_COMPLEX-file-upload'] == undefined || req.session.data['PAGENAME_FILE_UPLOAD_COMPLEX-file-upload'] == "")
        {
            // Trigger validation
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // Reload the page
            // This page name needs to match the page the user was just on
            res.redirect('PAGENAME_FILE_UPLOAD_COMPLEX');
        }
        else
        {
            // Continue to the next page
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
    })




    ////////////////////////////////////////////////////////////////////////////////////
    ////////////////                                                    ////////////////
    ////////////////                      END OF                        ////////////////
    ////////////////             FILE UPLOAD  - MANDATORY              ////////////////
    ////////////////                                                    ////////////////
    ////////////////////////////////////////////////////////////////////////////////////



}
