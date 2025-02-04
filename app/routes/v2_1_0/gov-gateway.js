
module.exports = function (router) {


    let section = "/account/";







    // NOT COMPLEX PAGE
    router.post(section + 'ZZZZZZZZZZZZZZZ', function (req, res)
    {
        // Turn errors off by default
        req.session.data['errorthispage'] = "false";
        req.session.data['errortypeone'] = "false";

        // If Yes was selected, continue to next page
        if (req.session.data['DDDDDDDDDDDDD'] == "XXX")
        {
            res.redirect('THE_NEXT_PAGE_NAME');
        }
        else if (req.session.data['DDDDDDDDD'] == "YYY")
        {
            res.redirect('THE_NEXT_PAGE_NAME');
        }
        else
        {
            // This page name needs to match the page the user was just on
            res.redirect('ZZZZZZZZZZZZZZZ');
        }
    })



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
            res.redirect('gov-gateway/sign-in');
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





}
