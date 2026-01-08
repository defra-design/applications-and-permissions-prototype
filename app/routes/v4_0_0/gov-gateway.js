
module.exports = function (router) {


    let section = "/account/";




    // From start page
    router.get(section + 'start-router', function (req, res)
    {
        // If Yes was selected, continue to next page
        if (req.session.data['customer-identity'] == "true")
        {
            res.redirect('sign-in-or-not');
        }
        else
        {
            res.redirect('../create-application/task-list');
        }
    })





    // NOT COMPLEX PAGE
    router.post(section + 'sign-in-or-not-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['account-sign-in-or-not-radios'] == "Yes, sign in")
        {
            req.session.data['end-of-journey-register-defra-account'] = "false";

            res.redirect('gg-or-gov-one-login');
        }
        else if (req.session.data['account-sign-in-or-not-radios'] == "No, use the service without signing in")
        {
            res.redirect('../create-application/task-list');
        }
        else
        {
            // Turn errors off by default
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('sign-in-or-not');
        }
    })
















    // Select gg or one login
    router.post(section + 'gg-or-gov-one-login-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['account-gg-or-gov-one-login-radios'] == "Sign in with GOV UK One Login")
        {
            req.session.data['account-sign-in-gg-email'] = "your.account.name@gmail.com";

            res.redirect('start-of-gov-one-login');
        }
        else if (req.session.data['account-gg-or-gov-one-login-radios'] == "Sign in with Government Gateway")
        {
            req.session.data['account-sign-in-gg-email'] = "your.account.name@gmail.com";

            res.redirect('gov-gateway/sign-in');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('gg-or-gov-one-login');
        }
    })





    // Select gg or one login
    router.post(section + 'sign-in-gov-one-login-email-router', function (req, res)
    {

        // This page name needs to match the page the user was just on
        res.redirect('sign-in-gov-one-login-password');

    })



    // NOT COMPLEX PAGE
    router.post(section + 'sign-in-gov-one-login-password-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['defra-account-registration'] == "true")
        {
            if (req.session.data['uncontrained-before-tb'] == "true")
            {
                res.redirect('unconstrained/task-list');
            }
            else
            {
                res.redirect('register/index');
            }
        }
        else
        {
            res.redirect('../../create-application/task-list');
        }
    })






    // NOT COMPLEX PAGE
    router.post(section + 'gov-gateway/sign-in-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['defra-account-registration'] == "true")
        {
            if (req.session.data['uncontrained-before-tb'] == "true")
            {
                res.redirect('../unconstrained/task-list');
            }
            else
            {
                res.redirect('../register/index');
            }
        }
        else
        {
            res.redirect('../../create-application/task-list');
        }
    })




    // email or txt for MFA code
    router.post(section + 'authentication/verify-single-number-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['verify-your-identity'] == "send-sms")
        {
            res.redirect('verify');
        }
        else if (req.session.data['verify-your-identity'] == "send-email")
        {
            res.redirect('security-word');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('verify-single-number');
        }
    })





    // NOT COMPLEX PAGE
    router.post(section + 'register/account-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['registrationAccountType'] == "Business")
        {
            res.redirect('uk-organisation');
        }
        else if (req.session.data['registrationAccountType'] == "Individual")
        {
            req.session.data['defaultFirstName'] = "Alex";
            req.session.data['defaultSurname'] = "Smith";

            req.session.data['registrationEmail'] = "alex.smith@gmail.com";

            res.redirect('address/postcode');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('account-type');
        }
    })





    // NOT COMPLEX PAGE
    router.post(section + 'register/uk-organisation-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['registrationTradeUK'] == "Yes")
        {
            res.redirect('companies-house');
        }
        else if (req.session.data['registrationTradeUK'] == "No")
        {
            res.redirect('business-name');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('uk-organisation');
        }
    })






    // a ltd company or not a company
    router.post(section + 'register/companies-house-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['registrationCompanyRegistrationNumber'] == "Yes")
        {
            res.redirect('companies-house-number');
        }
        else if (req.session.data['registrationCompanyRegistrationNumber'] == "No")
        {
            res.redirect('sole-trader-or-charity');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('companies-house');
        }
    })




    // a ltd company or not a company
    router.get(section + 'register/confirmtion-onwards-to-service', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['registrationSoleTraderAddress'] != undefined )
        {
            req.session.data['registrationSoleTraderAddress']
                = req.session.data['registrationSoleTraderAddress'].replace(/<br\s*\/?>/gi, '');
        }

        if (req.session.data['registrationCharityAddress'] != undefined )
        {
            req.session.data['registrationCharityAddress']
                = req.session.data['registrationCharityAddress'].replace(/<br\s*\/?>/gi, '');
        }
        
        if (req.session.data['registrationIndividualAddress'] != undefined )
        {
            req.session.data['registrationIndividualAddress']
                = req.session.data['registrationIndividualAddress'].replace(/<br\s*\/?>/gi, '');
        }

        // This page name needs to match the page the user was just on
        res.redirect('../../create-application/task-list');


    })





















    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////

     //               unconstrained registration for defra account

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////





    // Routng to prepop registration
    router.get(section + 'unconstrained/personal-details/personal-details-start', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['end-of-journey-register-defra-account'] == "true")
        {
            res.redirect('your-name-select');
        }
        else
        {
            res.redirect('your-name');
        }
    })



    // Routng to prepop registration
    router.get(section + 'unconstrained/personal-details/your-name-select-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        // If Yes was selected, continue to next page
        if (req.session.data['unconstrained-your-name-select-radios'] == "I want to register using a different name")
        {
            res.redirect('your-name');
        }
        else if (req.session.data['unconstrained-your-name-select-radios'] == undefined
                  ||  req.session.data['unconstrained-your-name-select-radios'] == "" )
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('your-name-select');
        }
        else
        {
            req.session.data['unconstrained-your-name-text-input'] = req.session.data['unconstrained-your-name-select-radios'];

            res.redirect('your-address-select');
        }
    })





    router.post(section + 'unconstrained/personal-details/your-name-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";

        // Validation check if field is blank
        if (req.session.data['unconstrained-your-name-text-input'] == undefined || req.session.data['unconstrained-your-name-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page name needs to match the page the user was just on
            res.redirect('your-name');
        }

        else
        {
            if (req.session.data['end-of-journey-register-defra-account'] == "true")
            {
                res.redirect('your-address-select');
            }
            else
            {
                res.redirect('your-address');
            }
        }
    })





    // Routng to prepop registration
    router.get(section + 'unconstrained/personal-details/your-address-select-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        // If Yes was selected, continue to next page
        if (req.session.data['unconstrained-your-address-select-radios'] == "I want to register using a different address")
        {
            res.redirect('your-address');
        }
        else if (req.session.data['unconstrained-your-address-select-radios'] == undefined
            ||  req.session.data['unconstrained-your-address-select-radios'] == "" )
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page address needs to match the page the user was just on
            res.redirect('your-address-select');
        }
        else
        {
            req.session.data['unconstrained-your-address-text-input'] = req.session.data['unconstrained-your-address-select-radios'];

            res.redirect('your-contact-number-select');
        }
    })






    router.post(section + 'unconstrained/personal-details/your-address-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";

        // Validation check if field is blank
        if (req.session.data['unconstrained-your-address-address-line-1'] == undefined || req.session.data['unconstrained-your-address-address-line-1'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page address needs to match the page the user was just on
            res.redirect('your-address');
        }

        else
        {
            if (req.session.data['end-of-journey-register-defra-account'] == "true")
            {
                res.redirect('your-contact-number-select');
            }
            else
            {
                res.redirect('your-contact-number');
            }
        }
    })





    // Routng to prepop registration
    router.get(section + 'unconstrained/personal-details/your-contact-number-select-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";


        // If Yes was selected, continue to next page
        if (req.session.data['unconstrained-your-contact-number-select-radios'] == "I want to register using a different phone number")
        {
            res.redirect('your-contact-number');
        }
        else if (req.session.data['unconstrained-your-contact-number-select-radios'] == undefined
            ||  req.session.data['unconstrained-your-contact-number-select-radios'] == "" )
        {
            // Trigger validation and reload the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page contact-number needs to match the page the user was just on
            res.redirect('your-contact-number-select');
        }
        else
        {
            req.session.data['unconstrained-your-contact-number-text-input'] = req.session.data['unconstrained-your-contact-number-select-radios'];

            res.redirect('personal-use');
        }
    })






    router.post(section + 'unconstrained/personal-details/your-contact-number-router', function (req, res)
    {
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";
        req.session.data['errortypetwo'] = "false";

        // Validation check if field is blank
        if (req.session.data['unconstrained-your-contact-number-text-input'] == undefined || req.session.data['unconstrained-your-contact-number-text-input'] == "")
        {
            // Trigger validation and relaunch the page
            req.session.data['errorthispage'] = "true";
            req.session.data['errortypeone'] = "true";

            // This page contact-number needs to match the page the user was just on
            res.redirect('your-contact-number');
        }

        else
        {
            res.redirect('personal-use');
        }
    })










    // Select gg or one login
    router.post(section + 'unconstrained/business-details/uk-business-or-not-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['unconstrained-uk-business-or-not-radios-yes-no'] == "Yes")
        {
            res.redirect('business-type');
        }
        else if (req.session.data['unconstrained-uk-business-or-not-radios-yes-no'] == "No")
        {
            res.redirect('business-name');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('uk-business-or-not');
        }
    })







    // Select gg or one login
    router.post(section + 'unconstrained/business-details/business-type-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['unconstrained-business-type-radios'] == "Sole trader")
        {
            res.redirect('check-answers');
        }
        else if (req.session.data['unconstrained-business-type-radios'] == "Partnership")
        {
            res.redirect('business-name');
        }
        else if (req.session.data['unconstrained-business-type-radios'] == "Limited liability partnership (LLP)")
        {
            res.redirect('companies-house-number');
        }
        else if (req.session.data['unconstrained-business-type-radios'] == "Limited liability (LTD)")
        {
            res.redirect('companies-house-number');
        }
        else if (req.session.data['unconstrained-business-type-radios'] == "Another business type")
        {
            res.redirect('business-name');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('business-type');
        }
    })










    //    PETS sign in after service
    /////////////////////////////////////////


    // Select gg or one login
    router.post(section + 'pet-travel/pets-gg-or-gov-one-login-router', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['account-pets-gg-or-gov-one-login-radios'] == "Sign in with GOV UK One Login")
        {
            res.redirect('start-of-gov-one-login');
        }
        else if (req.session.data['account-pets-gg-or-gov-one-login-radios'] == "Sign in with Government Gateway")
        {
            res.redirect('sign-in-gg');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('uk-business-or-not');
        }
    })




}
