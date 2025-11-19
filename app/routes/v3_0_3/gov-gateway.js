
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
            res.redirect('start-of-gov-one-login');
        }
        else if (req.session.data['account-gg-or-gov-one-login-radios'] == "Sign in with Government Gateway")
        {
            res.redirect('gov-gateway/sign-in');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('gg-or-gov-one-login');
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
            res.redirect('start-of-gov-one-login');
        }
        else if (req.session.data['account-gg-or-gov-one-login-radios'] == "Sign in with Government Gateway")
        {
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
            res.redirect('register/index');
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
            res.redirect('../register/index');
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





    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////

     //               unconstrained registration for defra account

    /////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////




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




}
